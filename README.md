# 3D Scene Configurator

Полноценный 3D-конфигуратор моделей на базе **React**, **Three.js**, **MobX** и **Vite**.  
Проект поддерживает загрузку, редактирование, экспорт и импорт сцен с сохранением всех параметров и внешнего вида.

Ознакомиться можно по ссылке: 3d-configurator-fawn.vercel.app

Либо создать свой деплой по кнопке внизу README файлв

## Возможности

- Загрузка `.glb/.gltf` моделей через drag-n-drop или через интерфейс
- Управление трансформацией каждой модели (позиция, вращение, масштаб)
- Изменение цветов отдельных частей модели
- Поддержка нескольких объектов на сцене одновременно
- Экспорт и импорт всей сцены в `.zip`, включая:
  - Конфигурацию (`scene.json`)
  - Все модели (`.glb`)
- Экспорт отдельных моделей с сохранёнными цветами
- Клонирование моделей
- Удаление моделей
- Панель со списком всех моделей в сцене
- Выделение выбранной модели с визуальной обводкой
- Реактивность на основе `mobx` + строгий режим

## Стек технологий

- [React 18](https://react.dev)
- [Three.js](https://threejs.org/)
- [@react-three/fiber](https://github.com/pmndrs/react-three-fiber)
- [MobX](https://mobx.js.org/)
- [Vite](https://vitejs.dev/)
- [JSZip](https://stuk.github.io/jszip/) — для упаковки/распаковки сцены

## Запуск проекта

```bash
git clone https://github.com/nkkpao/3d-configurator.git
cd 3d-configurator
npm install
npm run dev
```

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/import/project?template=https://github.com/nkkpao/3d-configurator)
