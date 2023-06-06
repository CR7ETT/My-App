import React, { useState } from 'react';
import { Text, View, TextInput, TouchableOpacity, FlatList, Alert} from 'react-native';
import { styles } from './styles';
import { Participant } from './components/Participant';

export function Home(){
    const [participants, setParticipants] = useState<string[]>([]);
    const [participantsName, setParticipantsName] = useState('');

   
 
   function handleParticipantAdd(){
    if(participants.includes(participantsName)){
        return Alert.alert("Participante existe", "Já existe um participante na lista com esse nome.")
     }

   setParticipants(prevState => [...prevState, participantsName]);
   setParticipantsName('');
  
   }
 
   function handleParticipantRemove(name: string){
       


    Alert.alert("Remover", `Remover o participant ${name} ?`, [
        {
            text: 'Sim',
            onPress: () => setParticipants(prevState => prevState.filter(participant => participant !== name))
        },
        {
            text: 'Não',
            style: 'cancel'
        }
    ])
   
   }
 
    return(
    <View style={styles.container}>
        <Text style={styles.eventName}>
            Nome do Evento
        </Text>
    
        <Text style={styles.eventDate}>
            Terça, 6 de junho de 2023. 
        </Text>

        <View style={styles.form}>
            <TextInput 
                style={styles.input}
                placeholder='Nome do Participante'
                placeholderTextColor='#6b6b6b'
                onChangeText={setParticipantsName}
                value={participantsName} 
            />

            <TouchableOpacity style={styles.button} onPress={handleParticipantAdd}>
                <Text style={styles.buttonText}>+</Text>
            </TouchableOpacity>
        </View>
    
        <FlatList 
            data={participants}
            keyExtractor={item => item}
            renderItem={({item}) => (
                <Participant 
                key={item}
                name={item}
                onRemove={() => handleParticipantRemove(item)}/>

            )}
           showsVerticalScrollIndicator={false}  
           ListEmptyComponent={() => (
            <Text style={styles.listEmptyText}>
                Nimguem chegou no envento ainda? adicione participantes a sua lista de presença.
            </Text>
           )}   
        />

      
        
        
    </View>
  )
}