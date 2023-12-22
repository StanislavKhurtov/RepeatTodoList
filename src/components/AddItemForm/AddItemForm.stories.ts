import type {Meta, StoryObj} from '@storybook/react'
import {AddItemForm} from "../AddItemForm/AddItemForm";
import {action} from '@storybook/addon-actions'

const meta = {
    component: AddItemForm,
    tags: ['autodocs'],
    title: 'Components/UI/AddItemForm',
    argTypes: {
        addItem: {
            description: 'Button clicked inside form',
            action: 'clicked',
        }
    },
} as Meta

export default meta
type Story = StoryObj<typeof AddItemForm>
export const DefaultAddItemForm: Story = {
    args:{
        label: 'Add Todo',
        trigger: 'Click',
        addItem: action('Button clicked inside form')
    }
}
