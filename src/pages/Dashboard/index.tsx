import axios, {AxiosResponse, AxiosError} from 'axios';
import React, {FormEvent, useState} from 'react'
import { useEffect } from 'react';
import { Container, Form, H1, Button, ButtonRed, ButtonGreen, Tabela} from './styles';
import { Link } from 'react-router-dom';
interface IEvent {
  id: string;
  nomeevento: string;
  local: string;
  diasemana: string;
  horario: string;
  like: number;
  dislike: number;
}

const Dashboard: React.FC = () => {
  const [nomeevento, setNomeevento] = useState('');
  const [local, setLocal] = useState('');
  const [diasemana, setDiasemana] = useState('');
  const [horario, setHorario] = useState('');
  const [eventos, setEventos] = useState<IEvent[]>([]);

  function handleSubmit(event: FormEvent) {
    event.preventDefault();
    axios({
      method: 'post',
      url: 'http://localhost:3333/events',
      data: {
        nomeevento,
        local,
        diasemana,
        horario
      }
    })
      .then((res: AxiosResponse<IEvent>)=>{
        setEventos([res.data, ...eventos]);
      })
      .catch((err: AxiosError) => {
        console.log(err)
      });
  }

  function getAllEvents() {
    axios({
      method: 'get',
      url: 'http://localhost:3333/events'
    })
      .then((res: AxiosResponse<IEvent[]>)=>{
        setEventos(res.data);
      })
      .catch((err: AxiosError) => {
        console.log(err)
      });
  }

  function handleDelete(event: React.MouseEvent<HTMLButtonElement, MouseEvent> ,event_id: string) {
    axios({
      method: 'delete',
      url: 'http://localhost:3333/events/' + event_id
    })
      .then((res: AxiosResponse<string>)=>{
        const novos_eventos = eventos.filter((evento)=> evento.id !== event_id);
        setEventos(novos_eventos);
      })
      .catch((err: AxiosError) => {
        console.log(err)
      });
  }

  function handleLike(event: React.MouseEvent<HTMLButtonElement, MouseEvent> ,event_id: string) {
    axios({
      method: 'post',
      url: 'http://localhost:3333/events/like/' + event_id
    })
      .then((res: AxiosResponse<IEvent>)=>{
        setEventos(eventos.map(eve => {
          if (eve.id === res.data.id) {
            return res.data;
          }
          else {
            return eve;
          }
        }));
      })
      .catch((err: AxiosError) => {
        console.log(err)
      });
  }

  function handleDislike(event: React.MouseEvent<HTMLButtonElement, MouseEvent> ,event_id: string) {
    axios({
      method: 'post',
      url: 'http://localhost:3333/events/dislike/' + event_id
    })
      .then((res: AxiosResponse<IEvent>)=>{
        setEventos(eventos.map(eve => {
          if (eve.id === res.data.id) {
            return res.data;
          }
          else {
            return eve;
          }
        }));
      })
      .catch((err: AxiosError) => {
        console.log(err)
      });
  }

  useEffect(()=>{
    getAllEvents();
  },[])

  return (
    <Container>
      <H1> Controle de Eventos </H1>
      <Form onSubmit={handleSubmit} >
        <input  type='text' name='nomeevento' onChange={(event) => setNomeevento(event.target.value) } placeholder='Nome do Evento' />
        <input  type='text' name='local' onChange={(event) => setLocal(event.target.value) } placeholder='Local' />
        <input  type='text' name='diasemana' onChange={(event) => setDiasemana(event.target.value) } placeholder='Dia da Semana' />
        <input  type='text' name="horario" onChange={(event) => setHorario(event.target.value) } placeholder="Hor??rio" />
        <Button type="submit">Salvar</Button>
      </Form>

      <Tabela>
        <thead>
          <tr>
            <th>Evento</th>
            <th>Local</th>
            <th>Dia da Semana</th>
            <th>Hor??rio</th>
            <th>Acoes</th>
          </tr>
        </thead>

        <tbody>
          {eventos.map((evento)=>{
            return (
              <tr key={evento.id} >
                <td>{evento.nomeevento}</td>
                <td>{evento.local}</td>
                <td>{evento.diasemana}</td>
                <td>{evento.horario}</td>
                <td>
                  <Button onClick={(event)=> handleDelete(event,evento.id)} >Remover</Button>
                  <ButtonGreen onClick={(event)=> handleLike(event,evento.id)} >Like - {evento.like}</ButtonGreen>
                  <ButtonRed onClick={(event)=> handleDislike(event,evento.id)} >Dislike - {evento.dislike}</ButtonRed>
                </td>
              </tr>
            )
          })}
        </tbody>
      </Tabela>
      <Link to="/total"> Ver Total </Link>

    </Container>
  )
}

export default Dashboard



