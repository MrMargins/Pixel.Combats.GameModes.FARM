import { Color } from 'pixel_combats/basic';
import { Game, LeaderBoard, Teams, Properties, Spawns, Timers } from 'pixel_combats/room';

const WTime = 3;
const ETime = 1;

const WStateValue = "W";
const EStateValue = "E";

const M = Timers.GetContext().Get("M");
const S = Properties.GetContext().Get("S");

Teams.Add("FARM", "FARM", new Color(1, 1, 1, 0));

LeaderBoard.PlayerLeaderBoardValues;

Teams.OnRequestJoinTeam.Add(function (p, t) { t.Add(p);
    p.Properties.Kills.Value = 1000;
    p.Properties.Scores.Value = 100000;
});
Teams.OnPlayerChangeTeam.Add(function (p) { p.Spawns.Spawn()});

M.OnTimer.Add(function () {
	switch (S.Value) {
		case WStateValue:
			SetE();
			break;
		case EStateValue:
			Game.RestartGame();
	}
});

SetW();

function SetW() {
	S.Value = WStateValue;
	M.Restart(WTime);
}
function SetE() {
	S.Value = EStateValue;
	Game.GameOver(LeaderBoard.GetTeams());
	M.Restart(ETime);
}