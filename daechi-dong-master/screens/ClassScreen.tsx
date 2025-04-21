import styled from 'styled-components/native';
import colors from '../colors';

const Container = styled.View`
  flex: 1;
  background-color: ${colors.beige};
  justify-content: center;
  align-items: center;
`;

const Title = styled.Text``;

const ClassScreen = () => {
  return (
    <Container>
      <Title>수업</Title>
    </Container>
  );
};

export default ClassScreen;
