export const TEXTFIELD = () => {
    return { // 输入框
        component: 'd-text-field',
        attrs: {
            hideDetails: true,
            auto: true,
            height: 5,
            kind: 'mt-0',
            backgroundColor: 'grey lighten-3',
            // appendOuterIcon: 'create'
        }
    }
}

export const SELECT = () => {
    return  {
        component: 'd-select',
        attrs: {
            auto: true,
            hideDetails: true,
            grey: true,
            height: 5,
            kind: 'mt-0',
            items: [1, 2, 3]
        }
    }
}
