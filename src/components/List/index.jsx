import React from 'react';
import classNames from 'classnames';

import axios from 'axios';

import Badge from '../Badge';
import removeSvg from '../../assets/img/remove.svg';

import './list.scss';

const List = ({ items, isRemovable, onClick, onRemove, onClickItem, activeItem }) => {
  const removeList = (item) => {
    if (window.confirm('вы дествительно хотите удалить список')) {
      axios.delete('http://localhost:3001/lists/' + item.id).then(() => {
        onRemove(item.id);
      });
    }
  };
  return (
    <ul onClick={onClick} className="list ">
      {items.map((item, index) => (
        <li
          key={index}
          className={classNames(item.className, {
            active: item.active ? item.active : activeItem && activeItem.id === item.id,
          })}
          // если есть функция onClickItem то содзается ананимная функция
          onClick={onClickItem ? () => onClickItem(item) : null}>
          <i> {item.icon ? item.icon : <Badge color={item.color.name} />}</i>
          <span>
            {item.name}
            {item.tasks && ` (${item.tasks.length})`}
          </span>
          {isRemovable && (
            <img
              onClick={() => {
                removeList(item);
              }}
              className="list__remove_icon"
              src={removeSvg}
              alt="remove icon"
            />
          )}
        </li>
      ))}
    </ul>
  );
};
export default List;

