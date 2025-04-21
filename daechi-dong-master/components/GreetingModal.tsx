import { useState } from 'react';
import { Dimensions, Modal } from 'react-native';
import styled from 'styled-components/native';
import colors from '../colors';
import { Ionicons } from '@expo/vector-icons';

const { width, height } = Dimensions.get('window');

const Container = styled.View`
  width: ${width}px;
  height: ${height}px;
  background-color: ${colors.lightBlue};
  flex: 1;
  justify-content: space-evenly;
  align-items: center;
`;

const Title = styled.Text`
  font-size: 48px;
  color: white;
  font-family: 'Jua';
`;

const Body = styled.View`
  background-color: ${colors.beige};
  width: 100%;
  height: 50%;
  padding: 20px;
`;

const BodyText = styled.Text`
  font-size: 20px;
  font-weight: 600;
  font-family: 'NotoSans';
`;

const ExitButton = styled.Pressable`
  flex-direction: row;
  align-items: center;
  border: none;
`;

const ExitButtonText = styled.Text`
  font-size: 24px;
  font-weight: 600;
  color: white;
  font-family: 'NotoSans';
  margin-left: 5px;
`;

const GreetingModal = () => {
  const [visible, setVisible] = useState<boolean>(true);

  return (
    <Modal visible={visible} animationType="none">
      <Container>
        <Title>대치동 마스터</Title>
        <Body>
          <BodyText>대치동 마스터에 오신 것을 환영합니다!</BodyText>
          <BodyText>
            대치동 마스터는 여러분의 수고스러운 수험생활의 도우미입니다.
          </BodyText>
        </Body>
        <ExitButton onPress={() => setVisible(false)}>
          <Ionicons name="close" color="white" size={24} />
          <ExitButtonText>닫기</ExitButtonText>
        </ExitButton>
      </Container>
    </Modal>
  );
};

export default GreetingModal;
