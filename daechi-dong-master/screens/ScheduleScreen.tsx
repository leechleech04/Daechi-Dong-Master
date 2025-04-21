import styled from 'styled-components/native';
import colors from '../colors';

const Container = styled.View`
  flex: 1;
  background-color: ${colors.beige};
  justify-content: center;
  align-items: center;
`;

const Title = styled.Text``;

const ScheduleScreen = () => {
  return (
    <Container>
      <Title>시간표</Title>
    </Container>
  );
};

export default ScheduleScreen;
