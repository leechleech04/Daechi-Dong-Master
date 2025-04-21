import styled from 'styled-components/native';
import colors from '../colors';
import { Dimensions } from 'react-native';
import { useStopwatch } from 'react-timer-hook';
import { Ionicons } from '@expo/vector-icons';

const { width, height } = Dimensions.get('window');

const Container = styled.View`
  flex: 1;
  background-color: ${colors.beige};
  align-items: center;
`;

const Timer = styled.View`
  background-color: ${colors.blue};
  width: ${width}px;
  height: ${height * 0.3}px;
  justify-content: center;
  padding: 0 20px;
`;

const TimerText = styled.Text`
  font-size: 24px;
  color: ${colors.gray};
  font-family: 'NotoSans';
  margin: 10px 0;
`;

const Time = styled.Text`
  font-size: 60px;
  color: white;
  font-family: 'Jua';
  text-align: center;
`;

const TimerButton = styled.Pressable`
  margin: 0 auto;
`;

const TimerScreen = () => {
  const { seconds, minutes, hours, isRunning, start, pause } = useStopwatch({
    autoStart: false,
  });

  const formatTime = (value: number) => {
    return String(value).padStart(2, '0');
  };

  return (
    <Container>
      <Timer>
        <TimerText>현재 순공부 시간:</TimerText>
        <Time>
          {formatTime(hours)}:{formatTime(minutes)}:{formatTime(seconds)}
        </Time>
        {isRunning ? (
          <TimerButton onPress={pause}>
            <Ionicons name="pause" size={36} color="white" />
          </TimerButton>
        ) : (
          <TimerButton onPress={start}>
            <Ionicons name="play" size={36} color="white" />
          </TimerButton>
        )}
      </Timer>
    </Container>
  );
};

export default TimerScreen;
