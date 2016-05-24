<!DOCTYPE html>

<html>
  <head>
    <title>THE Daily - Fantasy Baseball, No Commitment</title>
    <link rel="stylesheet" type="text/css" href="./style.css" />
    <script type="text/javascript" src="./jquery.js"></script>
  </head>
  <body>
    <div id="container">
      <div id="header">
        <h1>&nbsp;THE Daily</h1>
      </div>
      <div id="content">
        <p>Welcome to THE Daily Baseball. Since this is merely a mockup of the final site, you can jump directly in and pick a few players. Filter the players by clicking on the green menu below. Unfortunately, you aren't able to track their stats or daily points. They'll be listed in the list on the right, where you can also remove the players you don't want.</p>
        <hr/>
        <div id="player-list">
          <h2>Selected Players</h2>
          <table>
<?php
$slots = array("C", "1B", "2B", "3B", "SS", "OF1", "OF2", "OF3", "P1", "P2");
foreach($slots as $slot) {
  $slot_name = rtrim($slot, "123"); ?>
            <tr class="player-slot slot-<?php echo $slot; ?>">
              <td><?php echo $slot_name; ?></td>
              <td class="unchosen">Select a Player</td>
              <td class="remove-player remove-<?php echo $slot; ?>">X</td>
            </tr>
<?php } ?>
          </table>
        </div>
        <ul id="filter">
<?php
$filters = array("All Players", "All Players", "Pitchers", "Hitters", "C", "1B", "2B", "3B", "SS", "OF");
foreach($filters as $filter) { ?>
          <li><?php echo $filter; ?></li>
<?php } ?>
        </ul>
        <h2>Players</h2>
<?php
  $fp = fopen("data.txt","r");
  $contents = fread($fp, filesize("data.txt"));
  fclose($fp);
  
  $player_list = explode("\n", $contents);
  foreach($player_list as $player) {
    $categories = explode("|", $player);
    
    if(count($categories) != 0) {
    
      $class = "player-". $categories[1];
    
      if($categories[1] != "P")
      {
        $class .= " player-hitter";
      } ?>
        <div class="player <?php echo $class; ?>">
          <img src="players/<?php echo $categories[0]; ?>.jpg" class="player-headshot" />
          <p class="add-player add-<?php echo $categories[1]; ?>">Add <?php echo $categories[2]; ?></p>
          <h3><?php echo $categories[2]; ?> <span><?php echo $categories[1]; ?></span></h3>
          <table>
            <tr class="categories">
<?php if($categories[1] == "P") { ?>
              <td>W</td><td>K</td><td>ERA</td><td>WHIP</td><td>IP</td><td>K/BB</td>
<?php } else { ?>
              <td>AVG</td><td>HR</td><td>R</td><td>RBI</td><td>OPS</td><td>SB</td>
<?php } ?>
            </tr>
            <tr class="values">
<?php for($i = 3; $i <= 8; $i++) { ?>
              <td><?php echo $categories[$i]; ?></td>
<?php } ?>
            </tr>
          </table>
          <table>
            <tr class="points">
              <td>Cost:</td>
              <td><?php echo $categories[9]; ?></td>
              <td>PPG:</td>
              <td><?php echo $categories[10]; ?></td>
            </tr>
          </table>
          <hr/>
        </div>
<?php } } ?>
      </div>
      <div id="footer">
        <p>Designed by Dave Hettel. Not intended for public use.</p>
      </div>
    </div>
    <div id="overlay">
      <div id="overlay-inside">
        <p>You need to remove another player before choosing a player.</p>
        <div id="overlay-confirm"><p>No</p></div>
        <div id="overlay-dismiss"><p>OK</p></div>
      </div>
    </div>
    <script type="text/javascript" src="./daily.js"></script>
  </body>
</html>