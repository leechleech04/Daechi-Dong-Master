import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styled from 'styled-components/native';
import { Ionicons } from '@expo/vector-icons';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';
import { toggleTimerActive } from '../redux/isTimerActiveSlice';
import { formatTime } from '../utils';

const Container = styled.View`
  flex-direction: row;
`;

const SubjectTime = styled.Text`
  font-size: 20px;
  font-family: 'Jua';
  margin: 0 20px;
`;

const Button = styled.Pressable``;

const StopWatch = ({ subjectName }: { subjectName: string }) => {
  const isTimerActive = useSelector((state: RootState) => state.isTimerActive);
  const dispatch = useDispatch();

  const [seconds, setSeconds] = useState<number>(0);
  const [isActive, setIsActive] = useState<boolean>(false);

  useEffect(() => {
    const loadStoredTime = async () => {
      try {
        const storedSubjects = await AsyncStorage.getItem('subjects');
        if (storedSubjects) {
          const parsedSubjects = JSON.parse(storedSubjects);
          const subject = parsedSubjects.find(
            (subject: { name: string }) => subject.name === subjectName
          );
          if (subject) {
            setSeconds(subject.time);
          }
        }
      } catch (error) {
        console.error(error);
      }
    };

    loadStoredTime();
  }, []);

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (isActive) {
      interval = setInterval(() => {
        setSeconds((prev) => prev + 1);
      }, 1000);
    } else if (!isActive && seconds !== 0) {
      clearInterval(interval!);
    }

    return () => {
      clearInterval(interval);
    };
  }, [isActive, seconds]);

  const handleStartStop = async () => {
    if (isTimerActive && !isActive) {
      return;
    } else if (!isTimerActive && !isActive) {
      dispatch(toggleTimerActive());
    }
    if (isActive) {
      try {
        const storedSubjects = await AsyncStorage.getItem('subjects');
        const parsedSubjects = storedSubjects ? JSON.parse(storedSubjects) : [];
        const subject = parsedSubjects.find(
          (subject: { name: string }) => subject.name === subjectName
        );
        if (subject) {
          const updatedSubjects = parsedSubjects.map(
            (sub: { name: string; time: number }) =>
              sub.name === subjectName ? { name: sub.name, time: seconds } : sub
          );
          await AsyncStorage.setItem(
            'subjects',
            JSON.stringify(updatedSubjects)
          );
        }
      } catch (error) {
        console.error(error);
      }
      dispatch(toggleTimerActive());
    }

    setIsActive(!isActive);
  };

  return (
    <Container>
      <SubjectTime>{formatTime(seconds)}</SubjectTime>
      <Button onPress={handleStartStop}>
        <Ionicons name={isActive ? 'pause' : 'play'} size={20} color="black" />
      </Button>
    </Container>
  );
};

export default StopWatch;
