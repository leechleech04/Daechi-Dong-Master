import styled from 'styled-components/native';
import colors from '../colors';
import { Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import TimerSubject from '../components/TimerSubject';

const { width, height } = Dimensions.get('window');

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

const ScrollView = styled.ScrollView``;

const SubjectContainer = styled.View`
  width: ${width}px;
  padding: 5px 20px;
`;

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

const TimerScreen = () => {
  return (
    <Container>
      <SafeBox>
        <Timer>
          <TimerText>금일 순공 시간:</TimerText>
          <Time>00:00:00</Time>
        </Timer>
      </SafeBox>
      <ScrollView>
        <SubjectContainer>
          <TimerSubject title="국어" time="00:00:00" />
          <TimerSubject title="수학" time="00:00:00" />
          <TimerSubject title="영어" time="00:00:00" />
          <TimerSubject title="한국사" time="00:00:00" />
          <TimerSubject title="탐구" time="00:00:00" />
        </SubjectContainer>
      </ScrollView>
    </Container>
  );
};

export default TimerScreen;
