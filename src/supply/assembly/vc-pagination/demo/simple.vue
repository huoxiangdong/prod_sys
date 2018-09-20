<script>
import VcPagination from '../supply/assembly/vc-pagination'
import '../supply/assembly/vc-pagination/assets/index.styl'

export default {
  data () {
    return {
      current: 3,
    }
  },
  methods: {
    onChange (page) {
      console.log(page)
      this.current = page
    },
  },
  render () {
    return (
      <VcPagination
        onChange={this.onChange}
        current={this.current}
        total={25}
      />
    )
  },
}
</script>