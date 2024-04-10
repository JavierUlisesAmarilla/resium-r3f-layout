import * as FlexLayout from 'flexlayout-react'
import 'flexlayout-react/style/light.css'
import {One} from './One'


const model = FlexLayout.Model.fromJson({
  global: {tabEnableClose: false},
  borders: [
    {
      type: 'border',
      location: 'bottom',
      size: 100,
      children: [
        {
          type: 'tab',
          name: 'Four',
          component: 'text',
        },
      ],
    },
    {
      type: 'border',
      location: 'left',
      size: 100,
      children: [],
    },
  ],
  layout: {
    type: 'row',
    weight: 100,
    children: [
      {
        type: 'tabset',
        weight: 50,
        selected: 0,
        children: [
          {
            type: 'tab',
            name: 'One',
            component: 'one',
          },
        ],
      },
      {
        type: 'tabset',
        weight: 50,
        selected: 0,
        children: [
          {
            type: 'tab',
            name: 'Two',
            component: 'text',
          },
          {
            type: 'tab',
            name: 'Three',
            component: 'text',
          },
        ],
      },
    ],
  },
})


export const App = () => {
  const factory = (node: FlexLayout.TabNode) => {
    const component = node.getComponent()

    if (component === 'one') {
      return <One/>
    }

    if (component === 'button') {
      return <button>{node.getName()}</button>
    }
  }

  return (
    <FlexLayout.Layout
      model={model}
      factory={factory}
    />
  )
}
