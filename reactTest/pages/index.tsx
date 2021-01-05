import axios from 'axios'
import { useState, useEffect  } from 'react'
import styled from '@emotion/styled'

export default function Home() {
  const [family, setfamily] = useState([])
  const [members, setMembers] = useState([])

  useEffect(() => {
    makeApiCalls()
  }, [])
  return (
    <Container>
      <Title>
        Table Exercise
      </Title>
        {
           family.map((fam: any) =>
              <Family key={fam.name}>
                <FamilyName>{fam.name}</FamilyName>
                <FamilyMembers>
                  {
                    fam.memebersIds.map((member: any) => getMember(member))
                  }
                </FamilyMembers>
                
                
              </Family>
            )
            
        }
    </Container>
  )
  function getMember(memberId: string) {
    const memberFound = members.find((member) => member.id == memberId)
    if (memberFound == undefined) {
      return memberId
    }
    return <FamilyMemberText><b>{memberFound.title}:</b> ${memberFound.name}</FamilyMemberText>
  }
  async function makeApiCalls() {
    const families = axios.get('https://my-json-server.typicode.com/ajd01/demo/families')
    const members = axios.get('https://my-json-server.typicode.com/ajd01/demo/memebers')
    const request = await Promise.all([families, members])
    setfamily (request[0]["data"])
    setMembers (request[1]["data"])
  }
}

const Container = styled.div`
  display: flex;
  padding: 10px 30%;
  flex-direction: column;
`
const Title = styled.h1`
  text-align: center;
`
const Family = styled.div`
  display: flex;
`

const FamilyName = styled.div`
  flex: 1 0 0;
  margin: 1px;
  align-items: center;
  justify-content: center;
  display: flex;
  background-color: lightgray;

`

const FamilyMemberText = styled.p`
  padding-left: 30px;
`

const FamilyMembers = styled.div`
  flex: 1 0 0;
  margin: 1px;
  background-color: lightgray;
`


