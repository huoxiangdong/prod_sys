import { consoleWarn } from 'vuetify/src/util/console'

import VCheckbox from 'vuetify/src/components/VCheckbox'
import VIcon from 'vuetify/src/components/VIcon'

export default {
  props: {
    sortIcon: {
      type: String,
      default: 'arrow_upward'
    }
  },

  methods: {
    genTHead () {
      if (this.hideHeaders) return // Exit Early since no headers are needed.

      let children = []

      if (this.$scopedSlots.headers) {
        const row = this.$scopedSlots.headers({
          headers: this.headers,
          indeterminate: this.indeterminate,
          all: this.everyItem
        })

        children = [this.hasTag(row, 'th') ? this.genTR(row) : row, this.genTProgress()]
      } else {
        const row = this.headers.map(o => this.genHeader(o))
        const checkbox = this.$createElement(VCheckbox, {
          props: {
            dark: this.dark,
            light: this.light,
            color: this.selectAll === true ? '' : this.selectAll,
            hideDetails: true,
            inputValue: this.everyItem,
            indeterminate: this.indeterminate
          },
          on: { change: this.toggle }
        })

        this.hasSelectAll && row.unshift(this.$createElement('th', [checkbox]))

        children = [this.genTR(row), this.genTProgress()]
      }

      return this.$createElement('thead', [children])
    },
    genHeader (header) {
      const array = [
        this.$scopedSlots.headerCell
          ? this.$scopedSlots.headerCell({ header })
          : header[this.headerText]
      ]

      return this.$createElement('th', ...this.genHeaderData(header, array))
    },
    genHeaderData (header, children) {
      const classes = ['column']
      const data = {
        key: header[this.headerText],
        attrs: {
          role: 'columnheader',
          scope: 'col',
          width: header.width || null,
          'aria-label': header[this.headerText] || '',
          'aria-sort': 'none'
        }
      }

      if (header.sortable == null || header.sortable) {
        this.genHeaderSortingData(header, children, data, classes)
      } else {
        data.attrs['aria-label'] += ': Not sorted.' // TODO: Localization
      }

      classes.push(`text-xs-${header.align || 'left'}`)
      if (Array.isArray(header.class)) {
        classes.push(...header.class)
      } else if (header.class) {
        classes.push(header.class)
      }
      data.class = classes

      return [data, children]
    },
    genHeaderSortingData (header, children, data, classes) {
      if (!('value' in header)) {
        consoleWarn('Headers must have a value property that corresponds to a value in the v-model array', this)
      }

      data.attrs.tabIndex = 0
      data.on = {
        click: () => {
          this.expanded = {}
          this.sort(header.value)
        },
        keydown: e => {
          // check for space
          if (e.keyCode === 32) {
            e.preventDefault()
            this.sort(header.value)
          }
        }
      }

      classes.push('sortable')
      const icon = this.$createElement(VIcon, {
        props: {
          small: true
        }
      }, this.sortIcon)
      if (!header.align || header.align === 'left') {
        children.push(icon)
      } else {
        children.unshift(icon)
      }

      const pagination = this.computedPagination
      const beingSorted = pagination.sortBy === header.value
      if (beingSorted) {
        classes.push('active')
        if (pagination.descending) {
          classes.push('desc')
          data.attrs['aria-sort'] = 'descending'
          data.attrs['aria-label'] += ': Sorted descending. Activate to remove sorting.' // TODO: Localization
        } else {
          classes.push('asc')
          data.attrs['aria-sort'] = 'ascending'
          data.attrs['aria-label'] += ': Sorted ascending. Activate to sort descending.' // TODO: Localization
        }
      } else {
        data.attrs['aria-label'] += ': Not sorted. Activate to sort ascending.' // TODO: Localization
      }
    }
  }
}
