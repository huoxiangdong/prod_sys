export default {
 customProps: ['text'],
// v-btn
 dBtn: {
    BOOL_TYPE: ['absolute','append','block','bottom','dark','depressed','disabled','exact','fab','fixed','flat','icon','large','left','light','loading','nuxt','outline','replace','replace','round','small','top'],
    VALUE_TYPE: ['active-class','color','exact-active-class','href','input-value','ripple','tag','target','to','type','value']
 },
 // v-data-table
  dTable:  {
     BOOL_TYPE: ['dark','light','loading','must-sort','disable-initial-sort','expand','hide-actions','hide-headers'],
     VALUE_TYPE: ['pagination','header-text','headers-length','next-icon','no-data-text','no-results-text','no-data-text','no-results-text','pagination.sync','prev-icon','rows-per-page-items','rows-per-page-items','rows-per-page-text','search','sort-icon','total-items','value']
 },
 // v-icons
  dIcon: {
      BOOL_TYPE: ['dark','disabled','large','left','light','medium','right','small','x-large'],
      VALUE_TYPE: ['color','size']
  },
  // v-select
  dSelect: {
    BOOL_TYPE: ['allow-overflow','auto','autofocus','box','cache-items','chips','clearable','close-on-click','close-on-content-click','dark','deletable-chips','dense','disabled','dont-fill-mask-blanks','error','flat','full-width','hide-selected','input-activator','light','multi-line','multiple','offset-overflow','offset-x','offset-x','offset-x','open-on-click','open-on-hover','outline','persistent-hint','readonly','return-masked-value','return-object','reverse','single-line','small-chips','solo','solo-inverted','success','textarea','validate-on-blur','hideDetails'],
    VALUE_TYPE: ['activator','append-icon','append-outer-icon','attach','background-color','browser-autocomplete','clear-icon','color','content-class','counter','error-count','error-messages','filter','height','hint','item-avatar','item-disabled','item-text','item-value','items','label','loading','mask','max-height','max-width','messages','min-width','no-data-text','nudge-bottom','nudge-left','nudge-right','nudge-top','nudge-width','origin','placeholder','placeholder','position-y','prefix','prefix','prepend-inner-icon','rules','search-input','success-messages','suffix','transition','type','type','z-index']
  },
  // v-text-field
  dTextField: {
    BOOL_TYPE: ['dark','autofocus','box','clearable','disabled','dont-fill-mask-blanks','error','flat','full-width','hideDetails','light','outline','persistent-hint','readonly','return-masked-value','reverse','single-line','solo','solo-inverted','success','textarea','validate-on-blur'],
    VALUE_TYPE: ['value','append-icon','append-icon','append-outer-icon','background-color','browser-autocomplete','clear-icon','color','counter','error-count','error-messages','height','hint','label','loading','loading','messages','placeholder','prefix','prepend-icon','prepend-inner-icon','rules','success-messages','suffix','type','append-outer-icon-cb'],
    EVENT_TYPE: ['click:prepend','click:append','click:append','click:clear']
  },
}