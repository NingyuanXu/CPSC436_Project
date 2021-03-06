import React from "react";
import InputBlock from "./InputBlock";
import ComponentsContainer from "./ComponentsContainer";
import SearchBlock from "./SearchBlock";
import {getPosts, getPostsByIds} from "../../shared/globleFunctions";
import {connect} from "react-redux";
import {loadPosts} from "../actions";
import {IUser} from "../../../shared/ModelInterfaces";

interface IHomePageProps {
    user: IUser,
    loadPosts: any
}

interface IHomePageState {
    componentsType: IComponentsType
}

export enum IComponentsType {
    posts = 'posts',
    users = 'users',
    personal = 'personal'
}

class HomePage extends React.Component<IHomePageProps, IHomePageState> {
    constructor(props: IHomePageProps) {
        super(props);
        this.state = {
            componentsType: IComponentsType.posts
        }
    }

    async componentDidMount() {
        let postList: any[] = await getPosts();
        this.props.loadPosts(postList);
    }

    getPosts = () => {
        this.setState({componentsType: IComponentsType.posts})
    };

    getUsers = () => {
        this.setState({componentsType: IComponentsType.users})
    };

    getPersonal = () => {
        this.setState({componentsType: IComponentsType.personal})
    };

    render() {
        return (
            <div id="post-blog-page">
                <SearchBlock user={this.props.user} getPosts={this.getPosts} getUsers={this.getUsers} getPersonal={this.getPersonal}/>
                <div className="home-page-body">
                    <InputBlock user={this.props.user} />
                    <ComponentsContainer registeredUser={this.props.user} componentsType={this.state.componentsType} />
                </div>
            </div>
        );
    }

}

const mapStateToProps = (state: {postList: any }) => {
    return {
        postList: state.postList
    };
};
export default connect(mapStateToProps, {loadPosts})(HomePage);
