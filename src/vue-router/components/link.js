export default {
    name: 'routerLink',
    props: {
        tag: {
            type: String,
            default: 'a'
        },
        to: {
            type: String,
            required: true,
        }
    },
    methods: { 
        handleClick(to) {
            this.$router.push(to);
        }
    },
    render: function(h) {
       const { tag, to, $slots } = this;
        return (
            <tag onClick={this.handleClick.bind(this, to)}>{$slots.default}</tag>
        )
    }
}