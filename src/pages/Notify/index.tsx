import React, {useContext, useState, useEffect, useMemo} from 'react';
import {Alert, Switch, ActivityIndicator, FlatList, View} from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {FontAwesome5 as Icon} from '@expo/vector-icons';

/** UTILS */
import {sourceProfle} from '../../utils/profile';

/** COMPONENTS */
import Background from '../../components/Background';
import Button from '../../components/Button';
import Header from '../../components/Header';
import Modal from '../../components/Modal';

/** CONTEXTS */
import {AdminContext} from '../../contexts/admin';
import {AuthContext} from '../../contexts/auth';

import {
  Container,
  EmpytView,
  ViewSearchBar,
  SearchBar,
  ButtonCancel,
  ButtonUserInfo,
  ViewUserInfo,
  ImageProfile,
  UserInfo,
  TextInfo,
  TextHeader,
  InputModal,
  TextInfoModal,
  ViewButtonModal,
  ButtonApprove,
  ButtonBlock,
  ButtonText,
} from './styles';
import {IUser, IUserBlock} from '../../interfaces';

export default function Notify() {
  const {
    pendingUsers,
    allUsers,
    loading,
    loadingStorage,
    refreshing,
    approveRegistration,
    blockUser,
    makeUserAdmin,
    refreshPendingApproval,
    refreshUser,
  } = useContext(AdminContext);
  const {user} = useContext(AuthContext);

  const [filter, setFilter] = useState<string>('');
  const [message, setMessage] = useState<string>('');
  const [block, setBlock] = useState<IUserBlock>(undefined);
  const [makeAdmin, setSetMakeAdmin] = useState(null);
  const [listUsersPendding, setListUsersPendding] = useState<IUser[]>([]);
  const [listUsers, setListUsers] = useState<IUser[]>([]);

  function search(item: IUser) {
    return `${item.name}${item.email}`.includes(filter);
  }

  useEffect(() => {
    pendingUsers.length && setListUsersPendding(pendingUsers.filter(search));
    // setListUsersPendding([]);
  }, [filter, pendingUsers]);

  useEffect(() => {
    allUsers.length && setListUsers(allUsers.filter(search));
    // setListUsers([]);
  }, [filter, allUsers]);

  const Tab = createBottomTabNavigator();

  function BottonTab() {
    return (
      <Tab.Navigator
        tabBarOptions={{
          activeTintColor: '#FFF',
          style:{
            backgroundColor: 'rgba(58, 55, 56, 0.9)'
          }
        }}
      >
        <Tab.Screen
          name="Pendentes"
          component={renderPendingUsers}
          options={{
            tabBarLabel: 'Pendentes',
            tabBarBadge: pendingUsers?.length || undefined,
            tabBarIcon: ({ color, size }) => (
              <Icon name="user-check" color={color} size={size} />
            )
          }}/>
        <Tab.Screen
          name="Todos"
          component={renderAllUsers}
          options={{
            tabBarLabel: 'Todos',
            tabBarIcon: ({ color, size }) => (
              <Icon name="users" color={color} size={size} />
            )
          }}/>
        <Tab.Screen
          name="Admin"
          component={renderAdminUsers}
          options={{
            tabBarLabel: 'Administradores',
            tabBarIcon: ({ color, size }) => (
              <Icon name="user-cog" color={color} size={size} />
            )
          }}/>
      </Tab.Navigator>
    );
  }

  function renderEmpytComponent() {
    return (
      <EmpytView>
        <TextInfo
          style={{
            fontSize: 18,
            alignSelf: 'center',
          }}>
          Nenhum usuário encontrado
        </TextInfo>
      </EmpytView>
    );
  }

  function renderSeparator() {
    return (
      <View
        style={{
          height: 1,
          width: '86%',
          backgroundColor: '#CED0CE',
          marginLeft: '14%',
        }}
      />
    );
  }

  function renderFooter() {
    if (!loading) return null;

    return (
      <View
        style={{
          paddingVertical: 20,
        }}>
        <ActivityIndicator size="large" color="#00b94a" />
      </View>
    );
  }

  function renderHeader() {
    return (
      <ViewSearchBar>
        <SearchBar
          key="search"
          icon={{
            name: 'search',
          }}
          placeholder="Buscar usuário..."
          onChangeText={setFilter}
          value={filter}
          autoCapitalize="none"
        />
        {!!filter && (
          <ButtonCancel onPress={() => setFilter('')}>
            <Icon name="times" color="rgba(0, 0, 0, 0.4)" size={25} />
          </ButtonCancel>
        )}
      </ViewSearchBar>
    );
  }

  function renderItemApprove({_id, name, email, ...rest}: IUser) {
    return (
      <ViewUserInfo>
        <ImageProfile source={sourceProfle(rest)} />
        <UserInfo>
          <TextInfo>{name}</TextInfo>
          <TextInfo>{email}</TextInfo>
        </UserInfo>
        <ButtonApprove onPress={() => approveRegistration(_id)}>
          <ButtonText>Aprovar</ButtonText>
        </ButtonApprove>
      </ViewUserInfo>
    );
  }

  function renderItemNotice({_id, name, email, blocked, ...rest}: IUser) {
    return (
      <ViewUserInfo>
        <ImageProfile source={sourceProfle(rest)} />
        <UserInfo>
          <TextInfo>{name}</TextInfo>
          <TextInfo>{email}</TextInfo>
        </UserInfo>
        <ButtonBlock
            style={{
              backgroundColor: !blocked
                ? 'rgba(240, 0, 0, 0.95)'
                : '#2193F3',
            }}
            onPress={() => {
              if (blocked) {
                blockUser({_id, blocked: false});
              } else {
                setBlock({_id, blocked: true, message});
              }
            }}>
            <ButtonText>{blocked ? 'Desbloquear' : 'Bloquear'}</ButtonText>

          </ButtonBlock>
      </ViewUserInfo>
    );
  }

  function renderItem({_id, name, email, blocked, ...rest}: IUser) {
    return (
      <ButtonUserInfo
        onLongPress={() =>
          user._id !== _id &&
          setSetMakeNotice({_id, name, email, blocked, ...rest})
        }>
        <ViewUserInfo>
          <ImageProfile source={sourceProfle(rest)}/>
          <UserInfo>
            <TextInfo>{name}</TextInfo>
            <TextInfo>{email}</TextInfo>
          </UserInfo>
          <ButtonBlock
            style={{
              backgroundColor: !blocked
                ? (rest.admin ? 'transparent':'rgba(240, 0, 0, 0.95)')
                : (rest.admin ? 'transparent': 'rgba(33, 147, 243, 1)'),
            }}
            disabled={rest.admin}
            onPress={() => {
              if (blocked) {
                blockUser({_id, blocked: false});
              } else {
                setBlock({_id, blocked: true, message});
              }
            }}>
            {!rest.admin &&
              <ButtonText>{blocked ? 'Desbloquear' : 'Bloquear'}</ButtonText>
            }
          </ButtonBlock>
        </ViewUserInfo>
      </ButtonUserInfo>
    );
  }

  function renderPendingUsers() {
    return loadingStorage ? (
      <EmpytView>
        <ActivityIndicator size={50} color="#00b94a" />
      </EmpytView>
    ):  (
      <FlatList
        style={{backgroundColor: 'rgba(58, 55, 56, 1)'}}
        data={listUsersPendding}
        renderItem={({item}) => renderItemApprove(item)}
        contentContainerStyle={{ flexGrow: 1 }}
        keyExtractor={(item) => item._id}
        ItemSeparatorComponent={renderSeparator}
        onRefresh={refreshPendingApproval}
        refreshing={refreshing}
        ListFooterComponent={renderFooter}
        ListEmptyComponent={renderEmpytComponent}
      />
    );
  }

  function renderAllUsers() {
    return loadingStorage ? (
      <EmpytView>
        <ActivityIndicator size={50} color="#00b94a" />
      </EmpytView>
    ):
     (
      <FlatList
        style={{backgroundColor: 'rgba(58, 55, 56, 1)'}}
        data={listUsers}
        renderItem={({item}) => renderItem(item)}
        contentContainerStyle={{ flexGrow: 1 }}
        keyExtractor={(item) => item._id}
        ItemSeparatorComponent={renderSeparator}
        onRefresh={refreshUser}
        refreshing={refreshing}
        ListFooterComponent={renderFooter}
        ListEmptyComponent={renderEmpytComponent}
      />
    );
  }

  function renderAdminUsers() {
    return loadingStorage ? (
      <EmpytView>
        <ActivityIndicator size={50} color="#00b94a" />
      </EmpytView>
    ):
     (
      <FlatList
        style={{backgroundColor: 'rgba(58, 55, 56, 1)'}}
        data={listUsers.filter((user) => user.admin)}
        renderItem={({item}) => renderItemNotice(item)}
        keyExtractor={(item) => item._id}
        contentContainerStyle={{ flexGrow: 1 }}
        ItemSeparatorComponent={renderSeparator}
        onRefresh={refreshUser}
        refreshing={refreshing}
        ListFooterComponent={renderFooter}
        ListEmptyComponent={renderEmpytComponent}
      />
    );
  }

  return (
    <Background showLogoBackground>
      <Header>
        <TextHeader>Admin</TextHeader>
      </Header>
      <Container>
        {renderHeader()}
        {BottonTab()}
      </Container>
      {!!block && (
        <Modal>
          <TextInfoModal>Informe o motivo do bloqueio</TextInfoModal>
          <InputModal
            placeholder="Sua conta foi bloqueada pelo administrador"
            autoCorrect={false}
            autoCapitalize="none"
            onChangeText={setMessage}
          />
          <ViewButtonModal>
            <Button
              style={{width: '45%', backgroundColor: 'rgba(240, 0, 0, 0.95)', marginTop: 0}}
              onPress={() => setBlock(false)}
              disabled={loading}>
              <ButtonText>Cancelar</ButtonText>
            </Button>
            <Button
              style={{width: '45%', marginTop: 0}}
              onPress={() => {
                blockUser(block);
                setBlock();
              }}>
              {loading ? (
                <ActivityIndicator size={20} color="#fff" />
              ) : (
                <ButtonText>Bloquear Usuário</ButtonText>
              )}
            </Button>
          </ViewButtonModal>
        </Modal>
      )}
      {!!makeAdmin && (
        <Modal>
          <TextInfoModal>{makeAdmin.name}</TextInfoModal>
          <TextInfoModal>
            {makeAdmin.admin
              ? 'Tirar privilegios de administrador'
              : 'Tornar um administrador'}
            ?
          </TextInfoModal>
          <ViewButtonModal>
            <Button
              style={{width: '45%', backgroundColor: 'rgba(240, 0, 0, 0.95)', marginTop: 0}}
              onPress={() => setSetMakeNotice()}
              disabled={loading}>
              <ButtonText>Cancelar</ButtonText>
            </Button>
            <Button
              style={{width: '45%', marginTop: 0}}
              onPress={() => {
                makeUserNotice(makeAdmin._id, !makeAdmin.admin);
                setSetMakeNotice();
              }}>
              {loading ? (
                <ActivityIndicator size={20} color="#fff" />
              ) : (
                <ButtonText>Sim</ButtonText>
              )}
            </Button>
          </ViewButtonModal>
        </Modal>
      )}
    </Background>
  );
}
