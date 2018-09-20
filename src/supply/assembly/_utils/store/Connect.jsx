import shallowEqual from 'shallowequal'
import omit from 'omit.js'
import { getOptionProps } from '../props'
import PROPTYPES from '../types'

function getDisplayName(WrappedComponent) {
    return WrappedComponent.name || 'Component'
}

const defaultMapStateToProps = () => ({})

export default function Connect(mapStateToProps) {
    const shouldSubscribe = !!mapStateToProps 
    const finnalMapStateToProps = mapStateToProps || defaultMapStateToProps
    return function wrapWithConnect(WrappedComponent) {
       
        const tempProps = omit(WrappedComponent.props || {}, ['store'])
        const props = {}
        Object.keys(tempProps).forEach(k => { props[k] = PROPTYPES.any})

        const Connect = {
            name: `Connect_${getDisplayName(WrappedComponent)}`,
            props,
            inject: {
                storeContext: { default: {} } 
            },
            data() {
                this.store = this.storeContext.store 
                return {
                    subscribed: finnalMapStateToProps(this.store.getState(), this.$props)
                }
            },
            methods: {
                handleChange() {
                    if(!this.unsubscribe) {
                        return
                    }
                    const nextState = finnalMapStateToProps(this.store.getState(), this.$props)
                    if(!shallowEqual(this.subscribed, nextState)) {
                        this.subscribed = nextState
                    }
                },
                trySubscribe() {
                    if(shouldSubscribe) {
                        this.unsubscribe = this.store.subscribe(this.handleChange)
                        this.handleChange()
                    }
                },
                tryUnsubscribe() {
                    if(this.unsubscribe) {
                        this.unsubscribe()
                        this.unsubscribe = null 
                    }
                },
                getWrappedInstance() {
                    return this.$refs.wrappedInstance
                }

            },
            mounted() {
                this.trySubscribe()
            },
            beforeDestroy() {
                this.tryUnsubscribe()
            },
            render() {
                
                const { $listeners, $slots = {}, $attrs, $scopedSlots, subscribed, store } = this
                const props = getOptionProps(this)
                const wrapProps = {
                    props: {
                        ...props,
                        ...subscribed,
                        store
                    },
                    on: $listeners,
                    attrs: $attrs,
                    scopedSlots: $scopedSlots

                }
                return (
                    <WrappedComponent {...wrapProps} ref='wrappedInstance'>
                       {Object.keys($slots).map(name => (<template slot={name}>{$slots[name]}</template>))}
                    </WrappedComponent>
                )

            }

        }
        return Connect
    }
}