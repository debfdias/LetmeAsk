import { useNavigate, useParams } from 'react-router-dom'

import logoImg from '../assets/logo.svg';

import { Button } from '../components/Button';
import { Question } from '../components/Questions';
import { RoomCode } from '../components/RoomCode';
import { useAuth } from '../hooks/useAuth';
import { useRoomData } from '../hooks/useRoomData';
import { database } from '../services/firebase';

import '../styles/room.scss';

type RoomType = {
  id: string;
}

export function RoomAdmin()
{
  let navigate = useNavigate();
  //const { user } = useAuth();
  const params = useParams<RoomType>();
  const roomId = params.id;
  const { title, questions } = useRoomData(roomId!)

  async function handleCloseRoom() {
    await database.ref(`rooms/${roomId}`).update({
      endedAt: new Date(),
    })

    navigate('/'); 
  }

  function renderQuestions(){
    return (
      <div className="question-list">
        {questions.map(question => {
          return (
            <Question
              key={question.id}
              content={question.content}
              author={question.author}
            />
          );
        })}
      </div>
    )
  }
  
  return(
    <div id="page-room">
      <header>
        <div className="content">
          <img src={logoImg} alt="logo" />
          <div>
            <RoomCode code={roomId!} />
            <Button isOutlined onClick={handleCloseRoom}>Encerrar sala</Button>
          </div>
        </div>
      </header>

      <main>
        <div className="room-title">
          <h1>Sala {title}</h1>
          { questions.length > 0 && <span>{questions.length} pergunta(s)</span> }
        </div>

        {renderQuestions()}
      </main>
    </div>
  )
}