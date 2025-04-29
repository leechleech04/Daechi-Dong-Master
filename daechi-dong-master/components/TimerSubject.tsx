import styled from 'styled-components/native';
import colors from '../colors';
import { Ionicons } from '@expo/vector-icons';
import { useRef } from 'react';
import { Animated, PanResponder } from 'react-native';

const Subject = styled(Animated.View)`
  background-color: ${colors.lightBlue};
  border-radius: 10px;
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

const SubjectTime = styled.Text`
  font-size: 20px;
  font-family: 'Jua';
  margin: 0 20px;
`;

const StartButton = styled.Pressable``;

const TimerSubject = ({
  title,
  time,
  onDragStart,
  onDragEnd,
}: {
  title: string;
  time: string;
  onDragStart: () => void;
  onDragEnd: () => void;
}) => {
  const locateAnimation = useRef(new Animated.Value(0)).current;

  const colorAnimation = locateAnimation.interpolate({
    inputRange: [-200, 0, 200],
    outputRange: ['#f38181', colors.lightBlue, '#f38181'],
    extrapolate: 'clamp',
  });

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderGrant: () => {
        onDragStart();
      },
      onPanResponderMove: (_, { dx }) => {
        locateAnimation.setValue(dx);
      },
      onPanResponderRelease: (_, { dx }) => {
        if (Math.abs(dx) > 200) {
          // 과목 삭제하는 모달 창
        } else {
          Animated.spring(locateAnimation, {
            toValue: 0,
            useNativeDriver: true,
            bounciness: 10,
          }).start();
        }
        onDragEnd();
      },
    })
  ).current;

  return (
    <Subject
      style={{
        transform: [{ translateX: locateAnimation }],
        backgroundColor: colorAnimation,
      }}
      {...panResponder.panHandlers}
    >
      <TitleContainer>
        <SubjectTitle numberOfLines={1} ellipsizeMode="tail">
          {title}
        </SubjectTitle>
      </TitleContainer>
      <SubjectTime>{time}</SubjectTime>
      <StartButton>
        <Ionicons name="play" size={20} color="black" />
      </StartButton>
    </Subject>
  );
};

export default TimerSubject;
