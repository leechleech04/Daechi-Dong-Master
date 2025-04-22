import styled from 'styled-components/native';
import colors from '../colors';
import { Ionicons } from '@expo/vector-icons';

const Subject = styled.View`
  flex-direction: row;
  background-color: ${colors.lightBlue};
  border-radius: 10px;
  padding: 20px;
  align-items: center;
  margin: 5px 0;
`;

const SubjectTitle = styled.Text`
  font-size: 24px;
  font-weight: 700;
  flex-grow: 1;
`;

const SubjectTime = styled.Text`
  font-size: 24px;
  font-family: 'Jua';
  margin-right: 20px;
`;

const StartButton = styled.Pressable``;

const TimerSubject = ({ title, time }: { title: string; time: string }) => {
  return (
    <Subject>
      <SubjectTitle>{title}</SubjectTitle>
      <SubjectTime>{time}</SubjectTime>
      <StartButton>
        <Ionicons name="play" size={24} color="black" />
      </StartButton>
    </Subject>
  );
};

export default TimerSubject;
