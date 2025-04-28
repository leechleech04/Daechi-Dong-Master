import styled from 'styled-components/native';
import colors from '../colors';
import { Dimensions, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import TimerSubject from '../components/TimerSubject';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types';

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
          <TimerSubject title="탐구1" time="00:00:00" />
          <TimerSubject title="탐구2" time="00:00:00" />
          <TimerSubject title="탐구3" time="00:00:00" />
          <TimerSubject title="탐구4" time="00:00:00" />
          <TimerSubject title="제2외국어" time="00:00:00" />
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
