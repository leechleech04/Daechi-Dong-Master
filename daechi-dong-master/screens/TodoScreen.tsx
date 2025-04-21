import styled from 'styled-components/native';
import colors from '../colors';

const Container = styled.View`
  flex: 1;
  background-color: ${colors.beige};
  justify-content: center;
  align-items: center;
`;

const Title = styled.Text``;

const TodoScreen = () => {
  return (
    <Container>
      <Title>할 일</Title>
    </Container>
  );
};

export default TodoScreen;
