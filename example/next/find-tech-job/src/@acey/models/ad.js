import { Model } from 'acey'
import moment from 'moment'

const DEFAULT_STATE = {
    id: '',
    type: '',
    created_at: '',
    title: '',
    how_to_apply: '',
    company_logo: ''
}

class AdModel extends Model {
    constructor(initialState = DEFAULT_STATE, options){
        super(initialState, options)
    }

    ID = () => this.state.id
    type = () => this.state.type
    createdAt = () => new Date(this.state.created_at)
    title = () => this.state.title
    applyHTML = () => this.state.how_to_apply
    companyLogo = () => this.state.company_logo

    formatedCreatedAt = () => moment(this.createdAt()).format("MMM Do"); 

}

export default AdModel