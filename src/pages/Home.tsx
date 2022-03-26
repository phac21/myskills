import React, { useState, useEffect } from "react";

import { View, Text, StyleSheet, TextInput, Platform, FlatList} from "react-native";

import { Button } from "../components/Button";
import { SkillCard } from "../components/SkillCard";

interface SkillData{
    id: string;
    name: string;
}

export default function Home(){
    const [newSkill, setNewSkill] = useState('');
    const [mySkills, setMySkills] = useState<SkillData[]>([]);
    const [greeting,setGreeting] = useState('');

    function handleAddSkill(){
        const data = {
            id: String(new Date().getTime()),
            name: newSkill
        }
        console.log("New Skill", data);
        setMySkills(oldState => [...oldState, data]);
    }
    function handleRemoveSkill(id:string){
        setMySkills(oldstate => oldstate.filter(
            skill => skill.id !== id 
        ))
    }

    useEffect(() => {
        const horaAtual = new Date().getHours();
        // console.log(horaAtual)
        if (horaAtual >= 6 && horaAtual < 12){
            setGreeting('Bom-dia!')
        }
        else if(horaAtual >= 12 && horaAtual < 18){
            setGreeting('Boa tarde!');
        }else{
            setGreeting('Boa noite!');
        }

    }, [])
  return(
    <>
      <View style={styles.container}>
        <Text style={styles.title}>Bem-vindo, Pedro</Text>
        <Text style={styles.greeting}>{greeting}</Text>
        <TextInput 
            style={styles.input}
            placeholder="Nova Skill"
            placeholderTextColor="#555"
            onChangeText={setNewSkill}
        />
        <Button 
            title= "Adicionar"
            activeOpacity={0.6}
            onPress={handleAddSkill}
        />
        
        <Text style={[ styles.title,{marginVertical: 50}]}>
            Minhas habilidades:
        </Text>
        
        <FlatList 
            data={mySkills}
            keyExtractor={item => item.id}
            renderItem={({ item }) => (
                <SkillCard 
                    skill={item.name}
                    onPress={() => handleRemoveSkill(item.id)}
                />
            )}
        />

      </View>
    </>
  )
}

const styles = StyleSheet.create({
    container: {
        flex: 1, 
        backgroundColor: '#121015',
        paddingHorizontal: 20,
        paddingVertical: 40
        
    },
    title:{
        color: '#f5f5f5',
        fontSize: 24,
        fontWeight:'bold'
    },
    input:{
        backgroundColor: '#1F1E25',
        color: '#fff',
        fontSize: 24,
        padding: Platform.OS === 'ios' ? 15 :10,
        marginTop: 30,
        borderRadius: 7,
    },
    button: {
        backgroundColor: '#A370F7',
        padding: 15,
        borderRadius: 7,
        marginTop: 10,
        alignItems: 'center',
    },
    buttonText:{
        color: '#fff',
        fontSize: 17,
        fontWeight: "bold",
    },
    greeting:{
        color: '#fff',

    }
})