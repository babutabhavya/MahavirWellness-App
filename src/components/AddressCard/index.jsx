import React, {useState} from 'react';
import {Card, Divider, Portal, Modal} from 'react-native-paper';
import Link from '../Link';
import {TouchableOpacity, View} from 'react-native';
import Heading from '../Heading';
import Text from '../Text';
import Button from '../Buttons';
import {useAddressContext} from '../../hooks/address';
import {useNavigation} from '@react-navigation/native';
import isFunction from 'lodash/isFunction';
import DEFAULT_STYLES from '../../../styles';

export const concatenateIfNotEmpty = (...strings) =>
  strings.filter(str => str).join(', ');

export default function AddressCard({address, onSelect, noActions = false}) {
  const navigation = useNavigation();
  const {address_line_1, address_line_2, city, state, contact_person_name} =
    address;
  const {deleteAddress} = useAddressContext();
  const [isDeleteModalVisible, setDeleteModalVisible] = useState(false);

  const showDeleteModal = () => setDeleteModalVisible(true);

  const hideDeleteModal = () => setDeleteModalVisible(false);

  const handleDelete = () =>
    deleteAddress(address.id).then(() => hideDeleteModal());

  const title = concatenateIfNotEmpty(
    address_line_1,
    address_line_2,
    city,
    state,
  );
  const subtitle = contact_person_name
    ? `Contact Person: ${contact_person_name}`
    : null;

  return (
    <TouchableOpacity
      activeOpacity={isFunction(onSelect) ? undefined : 1}
      onPress={() => isFunction(onSelect) && onSelect(address)}>
      <Card
        style={[
          DEFAULT_STYLES.card,
          {
            paddingTop: 20,
            paddingBottom: !noActions && !isFunction(onSelect) ? 0 : 10,
          },
        ]}>
        <View style={{paddingHorizontal: 20, marginBottom: 15}}>
          <Heading level={6} style={{marginBottom: 10}}>
            {title}
          </Heading>
          {subtitle && <Text>{subtitle}</Text>}
        </View>
        {!noActions && !isFunction(onSelect) && (
          <>
            <Divider />
            <Card.Actions>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-evenly',
                }}>
                <Link
                  onPress={() => navigation.navigate('AddAddress', {address})}
                  style={{
                    flex: 0.5,
                    borderRightWidth: 1,
                    borderColor: '#cccccc',
                    textAlign: 'center',
                    justifyContent: 'center',
                  }}>
                  Edit
                </Link>
                <Link
                  style={{flex: 0.5, justifyContent: 'center'}}
                  onPress={showDeleteModal}>
                  Delete
                </Link>
              </View>
            </Card.Actions>
          </>
        )}

        <Portal>
          <Modal visible={isDeleteModalVisible} onDismiss={hideDeleteModal}>
            <Card style={{padding: 20}}>
              <Heading level={5} style={{marginBottom: 20}}>
                Confirm Delete
              </Heading>
              <Text style={{marginBottom: 20}}>
                Are you sure you want to delete this address?
              </Text>
              <Card.Actions>
                <View>
                  <Button onPress={handleDelete}>Delete</Button>
                </View>
                <View>
                  <Button onPress={hideDeleteModal}>Cancel</Button>
                </View>
              </Card.Actions>
            </Card>
          </Modal>
        </Portal>
      </Card>
    </TouchableOpacity>
  );
}
