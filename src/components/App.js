import React from 'react';
import SearchBar from './SearchBar.js';
import VideoList from './VideoList.js'
import VideoDetail from './VideoDetail.js'
import './App.css';
import YouTube from '../apis/youtube.js';


class App extends React.Component {
	constructor(props) {
		super(props);

		this.state = { videos: [], selectedVideo: null };
	}
	
    onTermSubmit = async (searchTerm) => {
		const res = await YouTube.get('/search', {
			params: {q: searchTerm}
		})

		this.setState({ videos: res.data.items });
	};
	
	onVideoSelect = (video) => {
		console.log("From the App", video);
		this.setState({selectedVideo: video});
	}

	render() {
        return(
            <div className="ui container">
                <SearchBar onTermSubmit={this.onTermSubmit}/>
				<VideoDetail selectedVideo={this.state.selectedVideo}/>
				<VideoList onVideoSelect={this.onVideoSelect} videos={this.state.videos}/>
			</div>
        );
    };
};

export default App;