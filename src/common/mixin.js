
import { debounce } from "common/utils.js";
import BackTop from "components/content/backTop/BackTop";
export const itemListenerMixin = {
  data() {
    return {
      itemImgListener: null,
      refresh: null
    }
  }
  ,
  mounted() {
    this.refresh = debounce(this.$refs.scroll.Refresh, 20);
    this.itemImgListener = () => {
      this.$refs.scroll && this.refresh()
    }
    this.$bus.$on("itemImgLoad", this.itemImgListener);
  },
}

export const backTopMixin = {
  data() {
    return {
      isShowBackTop: false,
    }
  }
  ,
  methods: {
    BackClick() {
      this.$refs.scroll.ScrollTo(0, 0, 200);
    }
  },
  components: {
    BackTop
  }
}