import { DisplayValueHeader, Color } from 'pixel_combats/basic';
import { Game, LeaderBoard, Teams, Ui, Properties, Spawns, Timers } from 'pixel_combats/room';

const WaitingPlayersTime = 4;
const EndOfMatchTime = 1;

const WaitingStateValue = "Waiting";
const EndOfMatchStateValue = "EndOfMatch";

const mainTimer = Timers.GetContext().Get("Main");
const stateProp = Properties.GetContext().Get("State");
Ui.GetContext().MainTimerId.Value = mainTimer.Id;

Teams.Add("FARM", "FARM", new Color(0, 0, 0, 0));

LeaderBoard.PlayerLeaderBoardValues = [
	new DisplayValueHeader("Kills", "К", "К"),
	new DisplayValueHeader("Scores", "О", "О")
];

Teams.OnRequestJoinTeam.Add(function (p, t) { t.Add(p);
    p.Properties.Kills.Value = 10000;
    p.Properties.Scores.Value = 100000;
});
Teams.OnPlayerChangeTeam.Add(function (p) { p.Spawns.Spawn()});

mainTimer.OnTimer.Add(function () {
	switch (stateProp.Value) {
		case WaitingStateValue:
			SetEndOfMatchMode();
			break;
		case EndOfMatchStateValue:
			Game.RestartGame();
			break;
	}
});

SetWaitingMode();

function SetWaitingMode() {
	stateProp.Value = WaitingStateValue;
	mainTimer.Restart(WaitingPlayersTime);
}
function SetEndOfMatchMode() {
	stateProp.Value = EndOfMatchStateValue;
	Game.GameOver(LeaderBoard.GetTeams());
	mainTimer.Restart(EndOfMatchTime);
}
