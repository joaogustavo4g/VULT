import React, { Component } from 'react';
import api from '../services/api';
import Popup from "reactjs-popup";

import './style.css';

export default class Main extends Component {

    state = {
        docs: [{ title: "Buscando tolls...", }],
        toolsInfo: {},
        page: 1,
        tag: "",
        button: "carregando...",
    }

    componentDidMount() {
        this.loadTools();
    }

    sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    loadTools = async (page = 1) => {
        const response = await api.get(`tools?tag=${this.state.tag}&page=${page}`);
        await this.sleep(2000);
        const { docs, ...toolsInfo } = response.data;
        this.setState({ docs, toolsInfo, page, button: "Open Link" });
    };

    nextPage = () => {
        const { page, toolsInfo } = this.state;

        if (page === toolsInfo.totalPages) return;

        const pageNumber = page + 1;

        this.loadTools(pageNumber);
    }

    prevPage = () => {
        const { page } = this.state;

        if (page === 1) return;

        const pageNumber = page - 1;

        this.loadTools(pageNumber);
    }

    removeTool = async (id) => {
        console.log(id)
        await api.delete(`/tools/${id}`);
        console.log("FLex")
        this.loadTools();
    }

    render() {
        const { docs, toolsInfo, page } = this.state;
        return (
            <div className="tools-list">
                <div className="tools-pesq">
                    <input type="text"
                        placeholder="pesquisar no site"
                        onChange={(event) => { this.setState({ tag: event.target.value }) }}
                        value={this.state.texto}
                    />
                </div>
                {docs.map(tool => (
                    <article key={tool._id}>
                        <button id="btn" onClick="">X remove</button>
                        <h3>{tool.title}</h3>
                        <p>{tool.description}</p>
                        <a target='blank' href={tool.link}>{this.state.button}</a>
                    </article>
                ))}
                <div className="tools-actions">
                    <button disabled={page === 1} onClick={this.prevPage}>Back</button>
                    <p>{this.state.page} / {this.state.toolsInfo.totalPages}</p>
                    <button disabled={page === toolsInfo.totalPages} onClick={this.nextPage}>Next</button>
                </div>
            </div>
        )
    }
}