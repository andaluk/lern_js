import React from 'react';
import { AppFrame, Menu } from '../../components';

const About = () => (
  <>
    <Menu />
    <AppFrame
      head1='О сервисе'
      head2='Сервис прогноза загрязнения воздуха'
      image='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAYAAACM/rhtAAAACXBIWXMAAAsTAAALEwEAmpwYAAABa0lEQVR4nO3YP0vDQBgG8AzOgl/Cr+HiIAjH1cGv0MydapKz0Ha7SW1nsZtTOjS5BBU3FcUIOjlU6Z/BbC02NBnklata9aqTYs72Hngg44/3kiO8mvZfslJw5zHxathyB8hwII1iyx1wA7dM4DLEb+uVYFi2Q6Csl0rLdgjZncshtljnE5KrOS4tGBWqcyTxau9A043SnBwVWqqHgE0WjYH8/NNGUaHcNFvA6lEfbroJXHeS0bN0wKtWAm8JWol8wIv7eAw8v4vlA24d9OGsGcNpMx49Swekv9zZAopRQPrDSVLZjpgqoKEmCOodpOoj6alrBqS9qL+LAtJp+d2iCmioCcJUrT6y28LySBZgqR6+4MT1mwgs2g+wXjyM/nyBabIIb/p7EwvMj0Cy34Y14kfYZDlNlqBXYG739glb7BGZjWVNpiDDAb0SJJh4XZx3FjXZggwHMpZ3sppvLGgyBm041aXC8Vzajq/yDCJ7/jaFMklBAAAAAElFTkSuQmCC'
    >
      <p>
        Сервис отображает прогнозные данные загрязнения воздуха в районе
        произвольного объекта (населенного пункта) найденного на карте по его
        названию.
      </p>
      <p>
        Данные отображаются в виде таблицы и на графике. Также вычисляются и
        отображаются среднесуточные показатели загрязнения.
      </p>
      <p>
        Сервис не имеет коммерческого назначения и создан с целью обучения
        технологиям построения приложений на JavaScript.
      </p>
    </AppFrame>
  </>
);
export default About;
