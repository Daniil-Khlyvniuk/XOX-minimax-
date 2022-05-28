import { cnv } from "../../App.js"
import { Circle } from "../Circle"
import { Cross } from "../Cross"
import { GridLine } from "../GrigLine"


export class Board {
	constructor(state) {
		this.state = state
	}

	FieldSize = cnv.width / 3
	lines = [
		new GridLine({
				mtX: this.FieldSize,
				mtY: 0,
				ltX: this.FieldSize,
				ltY: "",
				direction: "V"
			}
		),
		new GridLine({
				mtX: this.FieldSize * 2,
				mtY: 0,
				ltX: this.FieldSize * 2,
				ltY: "",
				direction: "V"
			}
		),
		new GridLine({
				mtX: 0,
				mtY: this.FieldSize,
				ltX: "",
				ltY: this.FieldSize,
				direction: "H"
			}
		),
		new GridLine({
				mtX: 0,
				mtY: this.FieldSize * 2,
				ltX: "",
				ltY: this.FieldSize * 2,
				direction: "H"
			}
		)
	]
	draw = this.drawGrid.bind(this)
	hasWon = this.isWin.bind(this)
	insert = this.insertSymbol.bind(this)


	isEmpty() {
		return this.state.every(row => row.every(el => !el))
	}

	isFull() {
		return this.state.every(row => row.every(el => el))
	}

	getAvailableMoves() {
		const moves = []
		this.state.forEach((row, i) => row.forEach((el, j) => {
			if (!el) moves.push([ i, j ])
		}))
		return moves
	}

	insertSymbol(sym, i, j) {
		if (!!this.state[i][j]) return
		this.state[i][j] = sym.toLowerCase()
	}

	drawSymbol(currSymbol, i, j, x, y) {
		console.log("test")
		switch (currSymbol) {
			case "x":
				const cross = new Cross(x, y, this.FieldSize)
				requestAnimationFrame(cross.render)
				break
			case "o":
				const circle = new Circle(x, y, this.FieldSize)
				requestAnimationFrame(circle.render())
				break
		}
	}

	isWin() {
		const { state } = this

		if (this.isEmpty()) return null

		if (!!state[0][0] && (state[0][0] === state[0][1]) && (state[0][1] === state[0][2])) return { winner: state[0][0] } // hor
		if (!!state[1][0] && (state[1][0] === state[1][1]) && (state[1][1] === state[1][2])) return { winner: state[1][0] } // hor
		if (!!state[2][0] && (state[2][0] === state[2][1]) && (state[2][1] === state[2][2])) return { winner: state[2][0] } // hor

		if (!!state[0][0] && (state[0][0] === state[1][0]) && (state[1][0] === state[2][0])) return { winner: state[0][0] } // vert
		if (!!state[0][1] && (state[0][1] === state[1][1]) && (state[1][1] === state[2][1])) return { winner: state[0][1] } // vert
		if (!!state[0][2] && (state[0][2] === state[1][2]) && (state[1][2] === state[2][2])) return { winner: state[0][2] } // vert

		if (!!state[0][0] && (state[0][0] === state[1][1]) && (state[1][1] === state[2][2])) return { winner: state[0][0] } // diag
		if (!!state[2][2] && (state[2][2] === state[1][1]) && (state[1][1] === state[2][0])) return { winner: state[0][0] } // diag

		if (this.isFull()) return { winner: "draw" }

		return null
	}

	drawGrid() {
		this.lines.forEach((line, i) => {
			setTimeout(line.draw, 250 * i)
		})
	}
}