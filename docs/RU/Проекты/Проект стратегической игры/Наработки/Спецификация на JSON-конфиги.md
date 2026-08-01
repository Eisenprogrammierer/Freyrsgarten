
1. Общие положения  
  
Настоящий документ определяет структуру и семантику JSON-конфигурационного файла для любой игровой сущности (Entity) в проекте "Operation Ozverin". Конфигурационный файл полностью описывает статические свойства сущности, её поведение, протоколы взаимодействия и правила развития. Все динамические состояния хранятся в битовой маске и каналах напряжений в рантайме и не являются частью конфига.  
  
---  
  
2. Полная форма JSON-конфига  
  
```json  
{  
"entity": {  
"class": "ministry | community_institution | enterprise | military_unit | resource_pool | infrastructure | service | military_factory | research_center | character | abstract",  
"label": "string",  
"functional_role": "string",  
"description": "string (optional)",  
  
"address": {  
"entity_id": "string (unique)",  
"parent_id": "string | null",  
"region_id": "string",  
"coordinates": {"x": "float", "y": "float"},  
"neighbors": ["entity_id", ...]  
},  
  
"ipo": {  
"input": {  
"matter": {  
"label": "string",  
"source_entities": ["entity_id", ...]  
},  
"energy": {  
"label": "string",  
"source_entities": ["entity_id", ...]  
},  
"information": {  
"label": "string",  
"source_entities": ["entity_id", ...]  
},  
"force": {  
"label": "string",  
"source_entities": ["entity_id", ...]  
}  
},  
"process": {  
"matter": {  
"label": "string",  
"calculators": ["string", ...]  
},  
"energy": {  
"label": "string",  
"calculators": ["string", ...]  
},  
"information": {  
"label": "string",  
"calculators": ["string", ...]  
},  
"force": {  
"label": "string",  
"calculators": ["string", ...]  
}  
},  
"output": {  
"matter": {"label": "string"},  
"energy": {"label": "string"},  
"information": {"label": "string"},  
"force": {"label": "string"}  
},  
"state": {  
"matter": {"label": "string"},  
"energy": {"label": "string"},  
"information": {"label": "string"},  
"force": {"label": "string"}  
}  
},  
  
"bitmask": {  
"layout": "30x2_plus_stage",  
"stage": {  
"bits": [0, 3],  
"states": {  
"0": "string",  
"1": "string",  
"2": "string",  
"3": "string",  
"4": "string",  
"5": "string",  
"6": "string",  
"7": "string"  
}  
},  
"indicators": {  
"indicator_name": {  
"bits": ["int (start)", "int (end)"],  
"label": "string",  
"states": {  
"0": "string",  
"1": "string",  
"2": "string",  
"3": "string"  
}  
}  
}  
},  
  
"voltage_channels": {  
"channel_name": {  
"label": "string",  
"initial": "float",  
"min": "float",  
"max": "float",  
"threshold_low": "float (optional)",  
"threshold_high": "float (optional)",  
"target_indicator": "string (optional)",  
"computed": "string (optional, formula)"  
}  
},  
  
"susceptibility_profile": {  
"modality_name": "float [0, 1]"  
},  
  
"influence_matrix": {  
"modality_name": {  
"target_indicator": "string",  
"instant_threshold": "float",  
"accumulation_threshold": "float",  
"decay_beta": "float [0, 1)"  
}  
},
"protocols": {  
"outgoing": {  
"protocol_id": {  
"target": "entity_id",  
"weight": "float",  
"mappings": [  
{  
"indicator": "string",  
"voltage": "string | null",  
"factor": "float"  
}  
]  
}  
},  
"incoming": {  
"protocol_id": {  
"source": "entity_id",  
"mappings": [  
{  
"source_indicator": "string",  
"target_voltage": "string",  
"factor": "float"  
}  
]  
}  
}  
},  
  
"resource_recipe": {  
"inputs": {  
"resource_name": "float (quantity)"  
},  
"outputs": {  
"resource_name": "float (quantity)"  
},  
"personnel": {  
"manual_laborers": "int",  
"white_collar": "int",  
"technicians": "int",  
"engineers": "int",  
"service_workers": "int",  
"scientists": "int",  
"security_personnel": "int",  
"humanitarians": "int"  
},  
"conditions": ["string (condition_id)", ...]  
},  
  
"decay_rates": {  
"resource_name": "float [0, 1]",  
"equipment": "float [0, 1]"  
},  
  
"validation_rules": [  
{  
"id": "string",  
"trigger": "on_indicator_change | on_tick",  
"target": "string (optional)",  
"condition": {},  
"action": "revert | decay_all_indicators | grow_all_indicators | grow_indicator",  
"decay_rate": "float (optional)",  
"growth_rate": "float (optional)",  
"message": "string (optional)"  
}  
],  
  
"composite_rules": [  
{  
"id": "string",  
"output": "string",  
"conditions": [  
{  
"condition": {},  
"output_value": "string",  
"description": "string"  
}  
],  
"default_value": "string"  
}  
],  
  
"metamorphosis_rules": [  
{  
"id": "string",  
"trigger": {},  
"condition": {},  
"on_success": {  
"action": "metamorphose | set_stage",  
"new_stage": "string",  
"new_label": "string",  
"modify_indicators": {},  
"reset_voltage": ["string", ...]  
},  
"on_failure": {  
"action": "set_stage",  
"new_stage": "string",  
"message": "string"  
}  
}  
],  
  
"event_handlers": {  
"subscriptions": ["event_template_id", ...]  
},  
  
"signal_delay_modifier": "float [0, ∞)"  
}  
}
```

---  
  
3. Пояснения к полям  
  
3.1. entity  
  
Корневой объект, описывающий сущность.  
  
Поле Тип Обязательное Описание  
class string Да Тип сущности. Допустимые значения: ministry, community_institution, enterprise, military_unit, resource_pool, infrastructure, service, military_factory, research_center, character, abstract  
label string Да Человекочитаемое название сущности  
functional_role string Да Краткое описание функции сущности в мире  
description string Нет Расширенное описание  
  
3.2. address  
  
Определяет положение сущности в иерархическом графе и географическом пространстве.  
  
Поле Тип Обязательное Описание  
entity_id string Да Уникальный идентификатор сущности в мире  
parent_id string \| null Да Идентификатор родительской сущности. null для корневых сущностей  
region_id string Да Идентификатор региона, в котором находится сущность  
coordinates object Да Географические координаты {x, y}  
neighbors array Нет Список идентификаторов соседних сущностей для горизонтальных связей  
  
3.3. ipo  
  
Описывает интерфейс сущности как закрытой термодинамической машины в терминах четырёх IPO-функций и четырёх доменов.  
  
3.3.1. input, process, output, state  
  
Каждая функция содержит четыре домена:  
  
Домен Описание  
matter Вещество, материалы, физические объекты  
energy Энергия, топливо, деньги как эквивалент энергии  
information Данные, приказы, знания, сигналы  
force Силовое воздействие, защита, принуждение

Поле Тип Описание  
label string Человекочитаемое описание функции  
source_entities array (Только для input) Список идентификаторов сущностей-источников  
calculators array (Только для process) Список идентификаторов калькуляторов, обрабатывающих входные данные

3.4. bitmask  
  
Определяет структуру 64-битовой маски состояния сущности.  
  
Поле Тип Описание  
layout string Схема разметки. Фиксированное значение: "30x2_plus_stage"  
stage object Конфигурация сегмента стадии развития  
stage.bits array [0, 3] — первые 4 бита маски  
stage.states object Отображение значений (0–7) на названия стадий  
indicators object Конфигурация 30 индикаторов по 2 бита каждый  
  
3.4.1. indicators.<name>  
  
Поле Тип Описание  
bits array [start, end] — диапазон битов в маске  
label string Название показателя  
states object Отображение значений (0–3) на качественные состояния  
  
3.5. voltage_channels  
  
Определяет каналы непрерывных напряжений, связанные с сущностью.  
  
Поле Тип Обязательное Описание  
label string Да Название канала  
initial float Да Начальное значение  
min float Да Минимальное значение  
max float Да Максимальное значение  
threshold_low float Нет Нижний порог для событий  
threshold_high float Нет Верхний порог для событий  
target_indicator string Нет Связанный индикатор в битовой маске  
computed string Нет Формула вычисления (например, "U_budget_minimal * 1.3")  
  
3.6. susceptibility_profile  
  
Определяет чувствительность сущности к 32 модальностям среды.  
  
Формат: {"modality_name": float}, где float ∈ [0, 1].  
  
0 означает полную невосприимчивость, 1 — максимальную чувствительность.  
  
3.7. influence_matrix  
  
Связывает модальности среды с конкретными индикаторами и порогами переключения.  
  
Поле Тип Описание  
target_indicator string Индикатор, на который влияет модальность  
instant_threshold float Мгновенный порог: при превышении бит переключается немедленно  
accumulation_threshold float Порог накопления: при превышении накопленного напряжения бит переключается  
decay_beta float Коэффициент затухания напряжения [0, 1)  
  
3.8. protocols  
  
Определяет исходящие и входящие протоколы взаимодействия с другими сущностями.  
  
3.8.1. outgoing  
  
Исходящие сигналы от данной сущности к другим.  
  
Поле Тип Описание  
target string Идентификатор целевой сущности  
weight float Общий вес протокола  
mappings array Список маппингов индикаторов и напряжений  
  
Каждый маппинг:  
  
Поле Тип Описание  
indicator string Индикатор-источник  
voltage string \| null Канал напряжения-источник (или null)  
factor float Коэффициент передачи  
  
3.8.2. incoming  
  
Входящие сигналы от других сущностей к данной.  
  
Поле Тип Описание  
source string Идентификатор сущности-источника  
mappings array Список маппингов  
  
Каждый маппинг:  
  
Поле Тип Описание  
source_indicator string Индикатор источника  
target_voltage string Канал напряжения цели  
factor float Коэффициент передачи  
  
3.9. resource_recipe  
  
(Только для предприятий) Определяет производственный рецепт.  
  
Поле Тип Описание  
inputs object Входные ресурсы: {"resource_name": quantity}  
outputs object Выходная продукция: {"resource_name": quantity}  
personnel object Требуемый персонал по категориям  
conditions array Особые условия (технологические, географические)  
  
3.10. decay_rates  
  
Определяет коэффициенты порчи (энтропии) для ресурсов и оборудования.  
  
Поле Тип Описание  
<resource_name> float Доля ресурса, теряемая за такт [0, 1]  
equipment float Скорость ухудшения состояния оборудования [0, 1]  
  
3.11. validation_rules  
  
Проверяют логическую непротиворечивость комбинаций значений битов.  
  
Поле Тип Описание  
id string Уникальный идентификатор правила  
trigger string Когда срабатывает: on_indicator_change или on_tick  
target string (Опционально) Целевой индикатор  
condition object Условие срабатывания (вложенная структура)  
action string Действие при нарушении  
decay_rate float (Опционально) Скорость ухудшения  
growth_rate float (Опционально) Скорость улучшения  
message string (Опционально) Сообщение при нарушении  
  
3.12. composite_rules  
  
Определяют вычисляемые свойства (композиты) на основе комбинаций индикаторов.

Поле Тип Описание  
id string Уникальный идентификатор правила  
output string Имя вычисляемого свойства  
conditions array Список условий и соответствующих выходных значений  
default_value string Значение по умолчанию  
  
3.13. metamorphosis_rules  
  
Определяют условия и действия при переходе сущности на новый виток развития.  
  
Поле Тип Описание  
id string Уникальный идентификатор правила  
trigger object Триггер запуска проверки  
condition object Условия успешной метаморфозы  
on_success object Действия при успехе  
on_failure object Действия при провале  
  
3.14. event_handlers  
  
Определяет подписки сущности на шаблоны событий.  
  
Поле Тип Описание  
subscriptions array Список идентификаторов шаблонов событий  
  
3.15. signal_delay_modifier  
  
Множитель задержки при отправке и получении сигналов. Базовое значение — 1.0. Значения больше 1.0 увеличивают задержку, меньше 1.0 — уменьшают.  
  
---  
  
4. Примечания  
  
5. Все строковые идентификаторы (entity_id, region_id, indicator_name, channel_name) должны быть уникальны в пределах области видимости.  
6. Битовые диапазоны (bits) не должны пересекаться в пределах одной маски.  
7. Сумма весов (weight, factor) не обязана равняться 1.0.  
8. Порядок полей в JSON не имеет значения.  
9. Расширение конфига новыми полями допустимо при инкременте версии спецификации.