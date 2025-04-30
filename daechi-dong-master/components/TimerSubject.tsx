import styled from 'styled-components/native';
import colors from '../colors';
import { Ionicons } from '@expo/vector-icons';
import { useEffect, useRef, useState } from 'react';
import { Animated, PanResponder } from 'react-native';

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

const SubjectTime = styled.Text`
  font-size: 20px;
  font-family: 'Jua';
  margin: 0 20px;
`;

const StartBtn = styled.Pressable``;

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
          locateAnimation.setValue(-80 + dx);
        } else {
          if (dx < 0) {
            locateAnimation.setValue(dx);
          }
        }
      },
      onPanResponderRelease: (_, { dx }) => {
        if (isDraggedRef.current) {
          if (dx > 0) {
            Animated.spring(locateAnimation, {
              toValue: 0,
              useNativeDriver: true,
              bounciness: 10,
            }).start();
            setIsDragged(false);
          } else {
            Animated.spring(locateAnimation, {
              toValue: -80,
              useNativeDriver: true,
              bounciness: 10,
            }).start();
            setIsDragged(true);
          }
        } else {
          if (dx < -80) {
            Animated.spring(locateAnimation, {
              toValue: -80,
              useNativeDriver: true,
              bounciness: 10,
            }).start();
            setIsDragged(true);
          } else {
            Animated.spring(locateAnimation, {
              toValue: 0,
              useNativeDriver: true,
              bounciness: 10,
            }).start();
            setIsDragged(false);
          }
        }

        onDragEnd();
      },
    })
  ).current;

  return (
    <Container
      style={{
        transform: [{ translateX: locateAnimation }],
      }}
      {...panResponder.panHandlers}
    >
      <Subject>
        <TitleContainer>
          <SubjectTitle numberOfLines={1} ellipsizeMode="tail">
            {title}
          </SubjectTitle>
        </TitleContainer>
        <SubjectTime>{time}</SubjectTime>
        <StartBtn>
          <Ionicons name="play" size={20} color="black" />
        </StartBtn>
      </Subject>
      <DeleteBtn>
        <Ionicons name="trash" size={20} color="black" />
      </DeleteBtn>
    </Container>
  );
};

export default TimerSubject;
