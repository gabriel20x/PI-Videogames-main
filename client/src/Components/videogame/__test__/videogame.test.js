import React from "react";
import {render} from '@testing-library/react'
import Videogame from '../Videogame'
import { MemoryRouter } from "react-router";

describe('Renderer component',()=>{

    test('Rendering the videogame card',()=>{
        const videogame = {
            name: 'Test',
            rating: 4.25,
            genres: [{name:'This'},{name:'is'},{name:'a'},{name:'test'}],
            id:1
        }
    
        const component = render(
        <MemoryRouter>
            <Videogame videogame={videogame}/>
        </MemoryRouter>
        )
    
        component.getByText('Test')
        component.getByText('This is a test')
    })
})
