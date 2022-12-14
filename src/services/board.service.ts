import { Board } from "../models/board.model"
import { UserClean } from "../models/user.model"
import { BoardRepository } from "../repositories/board.repository"

export class BoardService {
  async createBoard(name: String, user: UserClean): Promise<Board> {
    const result = await BoardRepository.create({
      name: name.toLocaleLowerCase(),
      user,
    })

    return result
  }

  async getBoards(userId: string): Promise<Array<Board>> {
    const result = await BoardRepository.find({ user: userId }).populate(
      "user",
      ["email", "username"]
    )

    return result
  }

  async deleteBoard(id: String): Promise<Board> {
    const result = await BoardRepository.findByIdAndDelete(id)

    return result as Board
  }

  async getBoard(name: String, user: UserClean): Promise<Board> {
    const result = await BoardRepository.findOne({ name, user })

    return result as Board
  }
}
