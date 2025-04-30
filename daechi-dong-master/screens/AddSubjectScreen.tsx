import styled from 'styled-components/native';
import colors from '../colors';
import { useState } from 'react';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types';
import AsyncStorage from '@react-native-async-storage/async-storage';

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
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
  elevation: 5;
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
  background-color: ${colors.lightBlue};
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

  const storeSubject = async () => {
    try {
      const existingSubjects = await AsyncStorage.getItem('subjects');
      const subjects = existingSubjects ? JSON.parse(existingSubjects) : [];
      if (
        subjects.some(
          (subject: { name: string }) => subject.name === subjectName
        )
      ) {
        alert('이미 존재하는 과목입니다.');
        return;
      }
      subjects.push({
        name: subjectName,
        time: '00:00:00',
      });
      await AsyncStorage.setItem('subjects', JSON.stringify(subjects));
    } catch (error) {
      console.error(error);
    }
  };

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
            if (subjectName.trim() === '') {
            } else {
              storeSubject();
              setSubjectName('');
              goBack();
            }
          }}
        >
          <BtnText>추가</BtnText>
        </AddBtn>
      </BtnBox>
    </Container>
  );
};

export default AddSubjectScreen;
