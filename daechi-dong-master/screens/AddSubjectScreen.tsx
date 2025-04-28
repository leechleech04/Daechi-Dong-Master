import styled from 'styled-components/native';
import colors from '../colors';
import { useState } from 'react';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types';

const Container = styled.View`
  background-color: ${colors.beige};
  flex: 1;
  align-items: center;
  padding: 30px;
`;

const MainText = styled.Text`
  font-size: 36px;
  font-weight: 700;
  margin-bottom: 30px;
`;

const SubjectNameInput = styled.TextInput`
  background-color: white;
  padding: 10px;
  font-size: 20px;
  font-weight: 600;
  border-radius: 10px;
  margin-bottom: 30px;
  align-self: stretch;
`;

const BtnBox = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-self: stretch;
`;

const BtnText = styled.Text`
  font-size: 20px;
  font-weight: 600;
`;

const Btn = styled.Pressable`
  padding: 10px 20px;
  border-radius: 10px;
`;

const CancelBtn = styled(Btn)`
  background-color: ${colors.gray};
`;

const AddBtn = styled(Btn)`
  background-color: ${colors.blue};
`;

type AddSubjectScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'AddSubjectScreen'
>;

type AddSubjectScreenProps = {
  navigation: AddSubjectScreenNavigationProp;
};

const AddSubjectScreen = ({
  navigation: { goBack },
}: AddSubjectScreenProps) => {
  const [subjectName, setSubjectName] = useState<string>('');
  console.log(subjectName);

  return (
    <Container>
      <MainText>과목 추가</MainText>
      <SubjectNameInput
        placeholder="추가할 과목 이름을 입력하세요"
        placeholderTextColor={colors.gray}
        value={subjectName}
        onChangeText={setSubjectName}
      />
      <BtnBox>
        <CancelBtn
          onPress={() => {
            goBack();
          }}
        >
          <BtnText>취소</BtnText>
        </CancelBtn>
        <AddBtn
          onPress={() => {
            goBack();
          }}
        >
          <BtnText>추가</BtnText>
        </AddBtn>
      </BtnBox>
    </Container>
  );
};

export default AddSubjectScreen;
