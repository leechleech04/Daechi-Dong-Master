import styled from 'styled-components/native';
import colors from '../colors';
import { Ionicons } from '@expo/vector-icons';
import { useEffect, useRef, useState } from 'react';
import { Animated, PanResponder } from 'react-native';
import { Dimensions } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import StopWatch from './StopWatch';

const { width } = Dimensions.get('window');

const Container = styled(Animated.View)`
  flex-direction: row;
`;

const Subject = styled.View`
  background-color: ${colors.lightBlue};
  border-radius: 10px;
  flex: 1;
  flex-direction: row;
  padding: 20px;
  align-items: center;
  margin: 5px 0;
`;

const TitleContainer = styled.View`
  flex: 1;
`;

const SubjectTitle = styled.Text`
  font-size: 20px;
  font-weight: 700;
  flex-grow: 1;
`;

const DeleteBtn = styled.Pressable`
  position: absolute;
  right: -80;
  align-self: center;
  background-color: ${colors.red};
  padding: 20px;
  border-radius: 10px;
`;

const TimerSubject = ({
  title,
  onDragStart,
  onDragEnd,
}: {
  title: string;
  onDragStart: () => void;
  onDragEnd: () => void;
}) => {
  const subjectLocation = useRef(new Animated.Value(0)).current;

  const [isDragged, setIsDragged] = useState(false);
  const isDraggedRef = useRef(isDragged);
  useEffect(() => {
    isDraggedRef.current = isDragged;
  }, [isDragged]);

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: (_, { dx, dy }) => {
        return Math.abs(dx) > Math.abs(dy);
      },
      onMoveShouldSetPanResponder: (_, { dx, dy }) => {
        return Math.abs(dx) > Math.abs(dy);
      },
      onPanResponderGrant: () => {
        onDragStart();
      },
      onPanResponderMove: (_, { dx }) => {
        if (isDraggedRef.current) {
          subjectLocation.setValue(-80 + dx);
        } else {
          if (dx < 0) {
            subjectLocation.setValue(dx);
          }
        }
      },
      onPanResponderRelease: (_, { dx }) => {
        if (isDraggedRef.current) {
          if (dx > 0) {
            fixSubjectLocation(0);
            setIsDragged(false);
          } else {
            fixSubjectLocation(-80);
            setIsDragged(true);
          }
        } else {
          if (dx < -80) {
            fixSubjectLocation(-80);
            setIsDragged(true);
          } else {
            fixSubjectLocation(0);
            setIsDragged(false);
          }
        }

        onDragEnd();
      },
    })
  ).current;

  const fixSubjectLocation = (location: number) => {
    Animated.spring(subjectLocation, {
      toValue: location,
      useNativeDriver: true,
      bounciness: 10,
    }).start();
  };

  const deleteSubject = async () => {
    try {
      const storedSubjects = await AsyncStorage.getItem('subjects');
      if (storedSubjects) {
        const parsedSubjects = JSON.parse(storedSubjects);
        const updatedSubjects = parsedSubjects.filter(
          (subject: { name: string }) => subject.name !== title
        );
        await AsyncStorage.setItem('subjects', JSON.stringify(updatedSubjects));
        setIsDragged(false);
        subjectLocation.setValue(0);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteSubject = () => {
    Animated.timing(subjectLocation, {
      toValue: width,
      duration: 300,
      useNativeDriver: true,
    }).start();
    setTimeout(() => {
      deleteSubject();
    }, 300);
  };

  return (
    <Container
      style={{
        transform: [{ translateX: subjectLocation }],
      }}
      {...panResponder.panHandlers}
    >
      <Subject>
        <TitleContainer>
          <SubjectTitle numberOfLines={1} ellipsizeMode="tail">
            {title}
          </SubjectTitle>
        </TitleContainer>
        <StopWatch subjectName={title} />
      </Subject>
      <DeleteBtn onPress={handleDeleteSubject}>
        <Ionicons name="trash" size={20} color="white" />
      </DeleteBtn>
    </Container>
  );
};

export default TimerSubject;
