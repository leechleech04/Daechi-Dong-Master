import styled from 'styled-components/native';
import colors from '../colors';
import { Dimensions, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import TimerSubject from '../components/TimerSubject';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList, Subject } from '../types';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useCallback, useState } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';

const { width } = Dimensions.get('window');

const Container = styled.View`
  flex: 1;
  background-color: ${colors.beige};
  align-items: center;
`;

const SafeBox = styled.SafeAreaView`
  background-color: ${colors.blue};
  width: ${width}px;
`;

const Timer = styled.View`
  justify-content: center;
  padding: 20px;
`;

const TimerText = styled.Text`
  font-size: 24px;
  color: ${colors.gray};
  font-weight: 700;
`;

const Time = styled.Text`
  font-size: 60px;
  color: white;
  font-family: 'Jua';
  text-align: center;
  margin: 10px 0;
`;

const SubjectContainer = styled.View`
  width: ${width}px;
  padding: 5px 20px;
`;

const AddSubjectBtn = styled.Pressable`
  flex-direction: row;
  background-color: ${colors.gray};
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  margin: 5px 0;
  padding: 10px;
`;

const AddSubjectText = styled.Text`
  font-size: 20px;
  font-weight: 600;
  margin-right: 10px;
`;

type TimerScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'TimerScreen'
>;

type TimerScreenProps = {
  navigation: TimerScreenNavigationProp;
};

const TimerScreen = ({ navigation: { navigate } }: TimerScreenProps) => {
  const [subjects, setSubjects] = useState<Subject[]>([]);

  const getSubjects = async () => {
    try {
      const storedSubjects = await AsyncStorage.getItem('subjects');
      if (storedSubjects) {
        setSubjects(JSON.parse(storedSubjects));
      }
    } catch (error) {
      console.error(error);
    }
  };

  useFocusEffect(
    useCallback(() => {
      getSubjects();
    }, [subjects])
  );

  const [isScrollEnabled, setIsScrollEnabled] = useState<boolean>(true);

  return (
    <Container>
      <SafeBox>
        <Timer>
          <TimerText>금일 순공 시간:</TimerText>
          <Time>00:00:00</Time>
        </Timer>
      </SafeBox>
      <ScrollView scrollEnabled={isScrollEnabled}>
        <SubjectContainer>
          {subjects.map((subject) => (
            <TimerSubject
              key={subject.name}
              title={subject.name}
              onDragStart={() => {
                setIsScrollEnabled(false);
              }}
              onDragEnd={() => {
                setIsScrollEnabled(true);
              }}
            />
          ))}
          <AddSubjectBtn
            onPress={() => {
              navigate('AddSubjectScreen');
            }}
          >
            <AddSubjectText>과목 추가하기</AddSubjectText>
            <Ionicons name="add" size={20} color="black" />
          </AddSubjectBtn>
        </SubjectContainer>
      </ScrollView>
    </Container>
  );
};

export default TimerScreen;
