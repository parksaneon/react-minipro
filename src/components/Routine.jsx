import { useEffect, useRef, useState } from 'react';
import { BsPlus } from 'react-icons/bs';
import './Routine.scss';
import { MdAccessTime } from 'react-icons/md';
import { GiHistogram } from 'react-icons/gi';
import { BsFillPersonFill } from 'react-icons/bs';
import { FiMoreHorizontal } from 'react-icons/fi';
import Moment from 'react-moment';
import 'moment/locale/ko';

import { classnames } from 'classnames';
import moment from 'moment';
import { useSelector } from 'react-redux';

const Lilist = ({ routines, removeRoutine, editRoutine }) => {
  const today = new Date();
  const boldDay = today.getDay();

  const allDays = [
    { id: 0, day: '일' },
    { id: 1, day: '월' },
    { id: 2, day: '화' },
    { id: 3, day: '수' },
    { id: 4, day: '목' },
    { id: 5, day: '금' },
    { id: 6, day: '토' },
  ];
  const checkDay = allDays.filter(today => today.id === boldDay);

  const StyleDay = ({ days }) => {
    return days.map(day => {
      return checkDay[0].day === day ? (
        <span style={{ color: 'black' }}>{day}</span>
      ) : (
        <span>{day}</span>
      );
    });
  };

  const RoutineLi = ({ routine }) => {
    const [menuActive, setMenuState] = useState(false);
    const [formActive, setFormState] = useState(false);
    const [text, setTextState] = useState(routine.routine);

    const input = useRef();
    const iconBtn = useRef();
    const btns = useRef();

    const showBtns = () => {
      setMenuState(!menuActive);
      setFormState(false);
    };

    const showform = () => {
      setFormState(!formActive);
    };

    const onChange = e => {
      setTextState(e.target.value);
    };
    const onSubmit = e => {
      e.preventDefault();
    };

    return (
      <li className="Routine-list" key={routine.id}>
        <form className={formActive ? 'show' : ''} onSubmit={onSubmit}>
          <input type="text" value={text} name="modifyText" ref={input} onChange={onChange} />
          <button
            onClick={() => {
              editRoutine(routine.id, input.current.value);
            }}
          >
            수정완료
          </button>
        </form>
        <p className={!formActive ? 'show' : ''}>{routine.routine}</p>
        <time style={{ fontWeight: 'bold' }}>
          {routine.startTime} ~ {routine.endTime} <StyleDay days={routine.day} />
        </time>
        <div className={`Routine-btn ${menuActive ? 'show' : ''}`} ref={btns}>
          <button onClick={showform}>수정</button>
          <button
            onClick={() => {
              removeRoutine(routine.id);
            }}
          >
            삭제
          </button>
        </div>
        <button ref={iconBtn} onClick={showBtns}>
          <FiMoreHorizontal />
        </button>
      </li>
    );
  };

  return routines.map(routine => <RoutineLi routine={routine} />);
};

const Routine = ({ routines, getRoutine, onLogout, history, removeRoutine, editRoutine }) => {
  useEffect(() => {
    getRoutine();
  }, []);
  console.log(history);

  const logout = () => {
    onLogout();
    localStorage.removeItem('token');
  };

  return (
    <div className="Routine">
      <div className="header">
        <time>
          <Moment interval={1000} format="M.DD (dd) hh:mm A" />
        </time>
        <h1>
          평온한 <Moment interval={1000} format="A" />
          입니다.
        </h1>
        <div className="logoutbtn">
          <button onClick={logout}>로그아웃</button>
        </div>
      </div>
      <ul className="section">
        <Lilist routines={routines} removeRoutine={removeRoutine} editRoutine={editRoutine} />
      </ul>
      <div className="plus">
        <button>
          <BsPlus />
        </button>
      </div>
      <nav className="navigation">
        <ul>
          <li>
            <button>
              <MdAccessTime />
            </button>
          </li>
          <li>
            <button>
              <GiHistogram />
            </button>
          </li>
          <li>
            <button>
              <BsFillPersonFill />
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Routine;
