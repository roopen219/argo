/*global Promise*/

import test from 'ava'
import io from 'socket.io'
import ioClient from 'socket.io-client'
import Gemini from '../gemini'
import GeminiService from '../geminiService'

let socketio = io()
let gemini = new Gemini(socketio)

socketio.listen(3000)
let client = ioClient('http://localhost:3000')

test('should register a service with the name User', t => {
    let userService = new GeminiService()
    gemini.use('user', )
})
