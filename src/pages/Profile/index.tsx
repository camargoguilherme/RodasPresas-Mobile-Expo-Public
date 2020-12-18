import React, {useContext, useState, useEffect} from 'react';
import {
  ActivityIndicator,
  Alert,
  FlatList,
  Switch,
  Platform,
  View,
} from 'react-native';
import {FontAwesome5 as Icon} from '@expo/vector-icons';
import * as Permissions from 'expo-permissions';


/** UTILS */
import {formatCPF, formatPhoneNumber, capitalize} from '../../utils/format';
import {attrs, sourceProfle} from '../../utils/profile';

/** SERVICES */
import {selectPhotoTapped, checkPermissions} from '../../services/upload-image';

/** CONTEXTS */
import {AuthContext} from '../../contexts/auth';

/** COMPONENTS */
import Background from '../../components/Background';
import Button from '../../components/Button';
import Header from '../../components/Header';
import Modal from '../../components/Modal';

import {
  Container,
  ViewProfile,
  ImageProfile,
  TextPercentage,
  ProgressBar,
  ChangePhoto,
  TextInfo,
  ViewInfo,
  Field,
  TextField,
  TextHeader,
  InputModal,
  AreaField,
  ViewButton,
  ButtonEdit,
  ButtonText,
  ViewAreaField,
} from './styles';

export default function Profile() {
  const {user, updateFields, loading, changePassword} = useContext(AuthContext);

  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled((previousState) => !previousState);
  const [isEditable, setIsEditable] = useState(false);
  const [showModalProfile, setShowModalProfile] = useState(false);

  const [name, setName] = useState(capitalize(user && user.name));
  const [email, setEmail] = useState(user && user.email);
  const [phone, setPhone] = useState(
    formatPhoneNumber(user && user.phone) || user.phone
  );
  const [city, setCity] = useState(user && user.city);
  const [bloodType, setBloodType] = useState(user && user.bloodType);
  const [healthPlan, setHealthPlan] = useState(user && user.healthPlan);
  const [cpf, setCpf] = useState(formatCPF(user && user.cpf) || user.cpf);
  const [emergencyPhone, setEmergencyPhone] = useState(
    formatPhoneNumber(user && user.emergencyPhone) || user.emergencyPhone
  );
  const [allergic, setAllergic] = useState(user && user.allergic);
  const [motorcycle, setMotorcycle] = useState(user && user.motorcycle);
  const [licensePlate, setLicensePlate] = useState(user && user.licensePlate);
  const [editing, setEditing] = useState({});
  const [image, setImage] = useState();
  const [uploading, setUploading] = useState(false);
  const [percent, setPercent] = useState(0);
  const [urlStorage, setUrlStorage] = useState(user && user.uriProfile);
  const [preview, setPreview] = useState(sourceProfle(user && user));
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [changePass, setChangePass] = useState(false);
  const [fcmToken, setFcmToken] = useState(user && user.fcmToken);

  useEffect(() => {
    handleSave();
    setPercent(0);
  }, [urlStorage]);

  async function handleSelectImage(fromCameraOrGalery: "camera" | "galery") {
    setUploading(true);
    setShowModalProfile(false);
    await selectPhotoTapped(
      user._id,
      fromCameraOrGalery,
      setPreview,
      setImage,
      setPercent,
      setUrlStorage,
      () => setUploading(false)
    );
  }

  function handleCancelSelectImage() {
    setShowModalProfile(false);
  }

  async function handleSave() {
    const editable = await updateFields({
      name,
      email,
      phone,
      city,
      bloodType,
      healthPlan,
      cpf,
      emergencyPhone,
      allergic,
      motorcycle,
      licensePlate,
      uriProfile: urlStorage,
      fcmToken,
    });
    setIsEditable(editable);
  }

  function handleCancel() {
    setIsEditable(false);
    setName(user && user.name);
    setEmail(user && user.email);
    setPhone(user && user.phone);
    setCity(user && user.city);
    setBloodType(user && user.bloodType);
    setHealthPlan(user && user.healthPlan);
    setCpf(user && user.cpf);
    setEmergencyPhone(user && user.emergencyPhone);
    setAllergic(user && user.allergic);
    setMotorcycle(user && user.motorcycle);
    setLicensePlate(user && user.licensePlate);
  }

  async function handleChangePassword() {
    const result = await changePassword(password, confirmPassword);
    setChangePass(result);
  }

  function handleCanvelChangePassword() {
    setPassword('');
    setChangePass(false);
    setChangePass(false);
  }

  function renderInputs({iconName, placeholder, value, ...rest}) {
    return (
      <AreaField key={`${iconName}`}>
        <Field>
          <Icon
            style={{marginLeft: 20}}
            name={iconName}
            size={20}
            color="rgba(255, 255, 255, 0.4)"
          />
        </Field>
        <Field>
          <TextField
            style={{color: value ? 'rgba(255, 255, 255, 1)' : 'rgba(0, 0, 0, 0.4)'}}>
            {value || placeholder}
          </TextField>
        </Field>
        <ButtonEdit
          onPress={() => {
            setIsEditable(true);
            setEditing({iconName, placeholder, ...rest});
          }}>
          <Icon name="chevron-right" color="rgba(255, 255, 255, 0.4)" size={25} />
        </ButtonEdit>
      </AreaField>
    );
  }

  function renderFields() {
    const inputs1 = [
      attrs('name', capitalize(name), setName),
      attrs('email', email, setEmail),
      attrs('phone', formatPhoneNumber(phone) || phone, setPhone),

    ];
    const inputs2 = [
      attrs('city', capitalize(city), setCity),
      attrs('bloodType', bloodType, setBloodType),
      attrs('healthPlan', healthPlan, setHealthPlan),
      attrs('idCard', formatCPF(cpf) || cpf, setCpf),
      attrs('emergencyPhone', formatPhoneNumber(emergencyPhone) || emergencyPhone, setEmergencyPhone),
      attrs('allergies', allergic, setAllergic),
      attrs('motorcycle', motorcycle, setMotorcycle),
      attrs('licensePlate', (licensePlate && `${licensePlate}`.toUpperCase()) || '', setLicensePlate),

    ];
    return (
      <>
        {inputs1.map(renderInputs)}
        <AreaField>
          <Field>
            <Icon
              style={{marginLeft: 20}}
              name="lock"
              size={20}
              color="rgba(255, 255, 255, 0.4)"
            />
          </Field>
          <Field>
            <TextField style={{color: 'rgba(255, 255, 255, 0.4)'}}>
              **************
            </TextField>
          </Field>
          <ButtonEdit onPress={() => setChangePass(true)}>
            <Icon name="chevron-right" color="rgba(255, 255, 255, 0.4)" size={25} />
          </ButtonEdit>
        </AreaField>
        {inputs2.map(renderInputs)}
      </>
    );
  }

  return (
    <Background showLogoBackground>
      <Header>
        <TextHeader style={{justifyContent: 'center'}}>Informações do usuário</TextHeader>
      </Header>
      <Container behavior={Platform.OS === 'ios' ? 'padding' : ''}>
        <ViewProfile>
          <ImageProfile source={preview}>
            <ProgressBar percent={parseInt(`${100-percent}`)}/>
            <ProgressBar percent={parseInt(`${0+percent}`)} background='rgba(255, 255, 255, 0.5)'/>
            {uploading && <TextPercentage>{parseInt(`${percent}`)}%</TextPercentage>}
          </ImageProfile>
          <ChangePhoto onPress={() => setShowModalProfile(true)/* testUpload()*/}>
            <Icon name="camera" color="#FFF" size={25} />
          </ChangePhoto>
        </ViewProfile>
        <ViewInfo>
          <ViewAreaField>
            {renderFields()}
          </ViewAreaField>
        </ViewInfo>
      </Container>
      {showModalProfile && (
        <Modal style={{justifyContent: 'center', alignItems: 'center'}}>
          <TextInfo
            style={{
              height: '10%',
            }}>
            Selecione uma Foto
          </TextInfo>
          <ViewButton
            style={{
              height: '75%',
              flexDirection: 'column',
              justifyContent: 'space-around',
            }}>
            <Button
              style={{width: '90%'}}
              onPress={() => handleSelectImage('camera')}>
              <ButtonText>Camera</ButtonText>
            </Button>
            <Button
              style={{width: '90%'}}
              onPress={() => handleSelectImage('galery')}>
              <ButtonText>Galeria</ButtonText>
            </Button>
            <Button
              style={{width: '40%', backgroundColor: 'red'}}
              onPress={handleCancelSelectImage}>
              <ButtonText>Cancelar</ButtonText>
            </Button>
          </ViewButton>
        </Modal>
      )}
      {!!isEditable && (
        <Modal>
          <TextInfo>Informe um novo valor</TextInfo>
          <InputModal
            {...editing}
            placeholder={editing.placeholder}
            autoCorrect={false}
            autoCapitalize="none"
            onChangeText={(text) => editing.set(text)}
          />
          <ViewButton>
            <Button
              style={{width: '45%', backgroundColor: loading ? 'rgba(240, 0, 0, 0.55)' : 'rgba(240, 0, 0, 0.95)', marginTop: 0}}
              onPress={handleCancel}
              disabled={loading}>
              <ButtonText>Cancelar</ButtonText>
            </Button>
            <Button style={{width: '45%', marginTop: 0}} onPress={handleSave}>
              {loading ? (
                <ActivityIndicator size={20} color="#fff" />
              ) : (
                <ButtonText>Salvar</ButtonText>
              )}
            </Button>
          </ViewButton>
        </Modal>
      )}
      {changePass && (
        <Modal>
          <TextInfo>Informe uma nova senha</TextInfo>
          <InputModal
            placeholder="Senha"
            autoCorrect={false}
            autoCapitalize="none"
            value={password}
            secureTextEntry
            onChangeText={(text) => setPassword(text)}
          />
          <InputModal
            placeholder="Confirme a senha"
            autoCorrect={false}
            autoCapitalize="none"
            value={confirmPassword}
            secureTextEntry
            onChangeText={(text) => setConfirmPassword(text)}
          />
          <ViewButton>
            <Button
              style={{width: '45%', backgroundColor: loading ? 'rgba(240, 0, 0, 0.55)' : 'rgba(240, 0, 0, 0.95)', marginTop: 0}}
              onPress={handleCanvelChangePassword}
              disabled={loading}>
              <ButtonText>Cancelar</ButtonText>
            </Button>
            <Button
              style={{width: '45%', marginTop: 0}}
              onPress={handleChangePassword}>
              {loading ? (
                <ActivityIndicator size={20} color="#fff" />
              ) : (
                <ButtonText>Salvar</ButtonText>
              )}
            </Button>
          </ViewButton>
        </Modal>
      )}
    </Background>
  );
}
