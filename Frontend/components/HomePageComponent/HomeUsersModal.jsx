import { View, Text, StyleSheet, Pressable, Modal, ScrollView, Dimensions} from "react-native";
import { useContext, useState, useEffect} from "react";
import { AuthContext } from "../../context/AuthProvider";
import { DataTable, useTheme } from 'react-native-paper';
import Colors from "../../constants/Colors";
import {  axiosGet } from "../../utils/axios";

const dimensions = Dimensions.get('window');
const deviceWidth = dimensions.width;

export default function HomeUserModal({ visibility, setModalVisible, users }) {
  // const [refresh, setRefresh] = useState(true)
  const [page, setPage] = useState(0);
  const theme = useTheme()

const itemsPerPage = 5;
const numberOfPages = Math.ceil(users.length / itemsPerPage);
const startIndex = page * itemsPerPage;
const endIndex = Math.min((page + 1) * itemsPerPage, users.length);
const visibleItems = users.slice(startIndex, endIndex);

return (
  <Modal      
   animationType="fade"
   transparent={true}
   visible={visibility}
   onRequestClose={() => visibility(false)}>
    
    <View style={styles.modalMainContainer}>
      <View style={[styles.modalContentContainer, {backgroundColor: theme.colors.darkGrayWhite}]}>
        <View style={styles.titleContainer}>
          <Text style={[styles.titleText, {color: theme.colors.fontcolor}]}>List of Users</Text>
        </View>
       
        <DataTable style={[styles.table, {backgroundColor: theme.colors.darkGrayWhite}]}>
          <DataTable.Header style={[styles.purpleTint, {backgroundColor: theme.colors.darkpurpletintPurple}]}>
            <DataTable.Title style={styles.idCell}>
              <Text style={styles.headerText}>ID</Text>
            </DataTable.Title>

            <DataTable.Title style={styles.nameCell}>
              <Text style={styles.headerText}>Name</Text>
            </DataTable.Title>

            <DataTable.Title style={styles.nameCell}>
              <Text style={styles.headerText}>Email</Text>
            </DataTable.Title>
          </DataTable.Header>

          {visibleItems.map((user, index) => (
            <DataTable.Row style={styles.tableRows} key={index}>
              <DataTable.Cell style={styles.idCell}>
                <Text style={[styles.item, {color: theme.colors.fontcolor}]}>{startIndex + (index+1)}</Text>
              </DataTable.Cell>

              <DataTable.Cell style={styles.nameCell}>
                <Text style={[, {color: theme.colors.fontcolor}]}>{user.name}</Text>
              </DataTable.Cell>

              <DataTable.Cell style={styles.nameCell}>
                <Text style={[styles.item, {color: theme.colors.fontcolor}]}>{user.email}</Text>
              </DataTable.Cell>
            </DataTable.Row>
          ))}

           <DataTable.Pagination
               page={page}
               numberOfPages={numberOfPages}
               onPageChange={(newPage) => setPage(newPage)}
               showFastPaginationControls
               label = {`${page+1} of ${numberOfPages}`}
           />
        </DataTable>
        <Pressable style={[styles.cancelButton, {backgroundColor: theme.colors.darkGrayWhite}]} onPress={()=>setModalVisible(false)}>
            <Text style={styles.cancelText}>
              Close
            </Text>
        </Pressable>
      </View>
    </View>
  </Modal>
);
}

const styles = StyleSheet.create({
    modalMainContainer: {
        backgroundColor: 'rgba(0,0,0,0.3)',
        justifyContent: 'center',
        alignContent: 'center',
        flex: 1,
      },
      modalContentContainer: {
        gap: 10,
        margin: 20,
        padding: 10,
        alignItems: 'center',
        borderRadius: 10,
        maxHeight:'80%'
      },
      titleContainer: {
        flexDirection: 'row',
        padding: 5,
      },
      titleText: {
        color: Colors.bgDarkGray, 
        fontSize: 18,
        fontFamily: 'PTSans-Bold',
      },
      table:{
        width:'90%',
        borderRadius:10,
        overflow:'hidden',
        height:340,
      },
      headerText:{
        color:Colors.bgOffWhite,
        fontFamily: 'PTSans-Bold',
        fontSize: 16,
      },
      itemText:{
        fontStyle: 'PTSans-Regular',
        color: Colors.bgDarkGray
      },
      cancelButton: {
        backgroundColor: 'white',
        justifyContent: "center",
        alignItems: "center",
        height: deviceWidth * .13,
        width: deviceWidth * .34,
        borderRadius: 10,
        paddingVertical: 10,
        marginVertical: 10,
        borderColor: Colors.bgPurple,
        borderWidth: 2,
      },
      cancelText: {
        color: Colors.bgPurple,
        fontSize: 16,
        fontFamily: 'PTSans-Bold',
      },
      purpleTint:{
        backgroundColor: Colors.bgPurpleTint
      },
      idCell:{
        flex: 0.5
      },
      nameCell:{
        flex:2
      }
})