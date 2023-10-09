import React from 'react';

const CategoriesDropDown = () => {
  let fakeCategories: string[] = [
    'Admin',
    'Arts',
    'Books',
    'Climate',
    'Corrections',
    'Education',
  ];

  return (
    <ul className='absolute border-solid border-2 border-black bg-contrastWhite rounded-3xl p-6 flex flex-col gap-3 text-accentBase'>
      {fakeCategories.map((category) => {
        return (
          <li key={category}>
            <a href='/'>{category}</a>
          </li>
        );
      })}
    </ul>
  );
};

export default CategoriesDropDown;
