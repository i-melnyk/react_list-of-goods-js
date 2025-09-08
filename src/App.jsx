import { useState } from 'react';
import cn from 'classnames';
import 'bulma/css/bulma.css';
import './App.scss';

export const goodsFromServer = [
  'Dumplings',
  'Carrot',
  'Eggs',
  'Ice cream',
  'Apple',
  'Bread',
  'Fish',
  'Honey',
  'Jam',
  'Garlic',
];

const SORT_FIELD_ALPHABER = 'alphabetically';
const SORT_FIELD_LENGTH = 'length';
const SORT_FIELD_REVERSE = 'Reverse';

function getPreparedGoods(goods, option = '') {
  const prepareGoods = [...goods];

  if (option) {
    prepareGoods.sort((good1, good2) => {
      switch (option) {
        case SORT_FIELD_ALPHABER:
          return good1.localeCompare(good2);
        case SORT_FIELD_LENGTH:
          return good1.length - good2.length;
        case SORT_FIELD_REVERSE:
          return good2.localeCompare(good1);
        default:
          return 0;
      }
    });
  }

  return prepareGoods;
}

export const App = () => {
  const [sortField, setSortField] = useState('');
  const visibleGoods = getPreparedGoods(goodsFromServer, sortField);

  return (
    <div className="section content">
      <div className="buttons">
        <button
          onClick={() => setSortField(SORT_FIELD_ALPHABER)}
          type="button"
          className={cn('button', 'is-info', {
            'is-light': sortField !== SORT_FIELD_ALPHABER,
          })}
        >
          Sort alphabetically
        </button>

        <button
          onClick={() => {
            setSortField(SORT_FIELD_LENGTH);
          }}
          type="button"
          className={cn('button', 'is-success', {
            'is-light': sortField !== SORT_FIELD_LENGTH,
          })}
        >
          Sort by length
        </button>

        <button
          onClick={() => {
            setSortField(SORT_FIELD_REVERSE);
          }}
          type="button"
          className={cn('button', 'is-is-warning', {
            'is-light': sortField !== SORT_FIELD_REVERSE,
          })}
        >
          Reverse
        </button>

        <button
          onClick={() => {
            setSortField('');
          }}
          type="button"
          className="button is-danger is-light"
        >
          Reset
        </button>
      </div>

      <ul>
        {visibleGoods.map(good => (
          <li key={good} data-cy="Good">
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
