//в виду того, что проект небольшой, сторы импортируются в компоненты напрямую,
//но если бы я планировал расширять приложение дальше, возможно было бы удобнее
//использовать этот сторадж как единую точку доступа
//ещё можно было бы обернуть store в React Provider, но MobX отлично работает
//и с прямыми импортами

import { modelStore } from "@/entities/model/model/modelStore";

export const store = {
  modelStore,
};

export type RootStore = typeof store;
