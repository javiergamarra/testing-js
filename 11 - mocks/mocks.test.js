function toPageDTO(page, toDTO) {
  return {
    ...page,
    results: page.results.map(toDTO)
  };
}

function toRestChangeset(changeset) {
  return {
    id: changeset.id,
    name: changeset.name,
    guid: changeset.guid,
    branchName: changeset.branch,
    comment: changeset.comment,
    authorName: changeset.author,
    date: changeset.date.toISOString()
  };
}

class ChangesetsController {
  getAllChangesetsService;

  constructor(getAllChangesetsService) {
    this.getAllChangesetsService = getAllChangesetsService;
  }

  async getChangesets(authenticatedUser, organizationName, repositoryName, pageParams, branchName) {
    const changesetsPage = await this.getAllChangesetsService.proceed(
      authenticatedUser,
      organizationName,
      repositoryName,
      pageParams,
      branchName
    );

    return toPageDTO(changesetsPage, toRestChangeset);
  }
}

describe("mocks pueden devolver valores de prueba", () => {
  let getAllChangesetsServiceMock = jest.fn().mockReturnValue({ results: [] });

  test("podemos devolver 0 resultados", async () => {
    const controller = new ChangesetsController({ proceed: getAllChangesetsServiceMock });

    const changesets = await controller.getChangesets({ user: "juan" }, "codice");

    expect(changesets).toEqual({ results: [] });
    expect(getAllChangesetsServiceMock).toHaveBeenCalledTimes(1);
    expect(getAllChangesetsServiceMock.mock.calls[0][0]).toEqual({ user: "juan" });
    expect(getAllChangesetsServiceMock.mock.calls[0][1]).toEqual("codice");
  });

  test("podemos transformar resultados", async () => {
    getAllChangesetsServiceMock = jest.fn().mockReturnValue({
      results: [
        {
          id: 1,
          name: "name",
          guid: "guid",
          branch: "branch",
          comment: "comment",
          author: "author",
          date: new Date("2020/01/01")
        }
      ]
    });

    const controller = new ChangesetsController({ proceed: getAllChangesetsServiceMock });

    const changesets = await controller.getChangesets();
    expect(changesets).toEqual({
      results: [
        {
          authorName: "author",
          branchName: "branch",
          comment: "comment",
          date: "2019-12-31T23:00:00.000Z",
          guid: "guid",
          id: 1,
          name: "name"
        }
      ]
    });
  });
});
