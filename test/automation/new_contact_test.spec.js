var import_test = require("@playwright/test");
var import_new_user = require("./new_user");
var import_open = require("./open");
var import_send_message = require("./send_message");
const userADisplayName = "userA";
const userBDisplayName = "userB";
const timeStamp = Date.now();
const testMessage = "Test-Message-";
const testReply = "Sending Reply Test Message";
(0, import_test.test)("Send message to new contact", async () => {
  const [windowA, windowB] = await Promise.all([(0, import_open.openApp)("1"), (0, import_open.openApp)("2")]);
  const userA = await (0, import_new_user.newUser)(windowA, userADisplayName);
  const userB = await (0, import_new_user.newUser)(windowB, userBDisplayName);
  await (0, import_send_message.sendMessage)(windowA, userB.sessionid, `${testMessage} + ${timeStamp}`);
  windowA.locator(`${testMessage} > svg`).waitFor;
  await windowA.isVisible("[data-testid=msg-status-outgoing]");
  await windowA.waitForTimeout(5500);
  await (0, import_send_message.sendMessage)(windowB, userA.sessionid, `${testReply} + ${timeStamp}`);
  await windowA.waitForTimeout(5500);
  await windowB.click("[data-testid=contact-section]");
  await windowA.waitForTimeout(2500);
  (0, import_test.expect)(await windowB.innerText(".module-conversation__user__profile-name")).toBe(userA.userName);
  await windowA.click("[data-testid=contact-section]");
  (0, import_test.expect)(await windowA.innerText(".module-conversation__user__profile-name")).toBe(userB.userName);
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vLi4vdHMvdGVzdC9hdXRvbWF0aW9uL25ld19jb250YWN0X3Rlc3Quc3BlYy50cyJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiaW1wb3J0IHsgX2VsZWN0cm9uLCBleHBlY3QsIHRlc3QgfSBmcm9tICdAcGxheXdyaWdodC90ZXN0JztcbmltcG9ydCB7IG5ld1VzZXIgfSBmcm9tICcuL25ld191c2VyJztcbmltcG9ydCB7IG9wZW5BcHAgfSBmcm9tICcuL29wZW4nO1xuaW1wb3J0IHsgc2VuZE1lc3NhZ2UgfSBmcm9tICcuL3NlbmRfbWVzc2FnZSc7XG5cbmNvbnN0IHVzZXJBRGlzcGxheU5hbWUgPSAndXNlckEnO1xuY29uc3QgdXNlckJEaXNwbGF5TmFtZSA9ICd1c2VyQic7XG5cbmNvbnN0IHRpbWVTdGFtcCA9IERhdGUubm93KCk7XG5cbmNvbnN0IHRlc3RNZXNzYWdlID0gJ1Rlc3QtTWVzc2FnZS0nO1xuY29uc3QgdGVzdFJlcGx5ID0gJ1NlbmRpbmcgUmVwbHkgVGVzdCBNZXNzYWdlJztcblxuLy8gU2VuZCBtZXNzYWdlIGluIG9uZSB0byBvbmUgY29udmVyc2F0aW9uIHdpdGggbmV3IGNvbnRhY3RcbnRlc3QoJ1NlbmQgbWVzc2FnZSB0byBuZXcgY29udGFjdCcsIGFzeW5jICgpID0+IHtcbiAgY29uc3QgW3dpbmRvd0EsIHdpbmRvd0JdID0gYXdhaXQgUHJvbWlzZS5hbGwoW29wZW5BcHAoJzEnKSwgb3BlbkFwcCgnMicpXSk7XG4gIC8vIENyZWF0ZSBVc2VyIEFcbiAgY29uc3QgdXNlckEgPSBhd2FpdCBuZXdVc2VyKHdpbmRvd0EsIHVzZXJBRGlzcGxheU5hbWUpO1xuICAvLyBDcmVhdGUgVXNlciBCXG4gIGNvbnN0IHVzZXJCID0gYXdhaXQgbmV3VXNlcih3aW5kb3dCLCB1c2VyQkRpc3BsYXlOYW1lKTtcbiAgLy8gVXNlciBBIHNlbmRzIG1lc3NhZ2UgdG8gVXNlciBCXG4gIGF3YWl0IHNlbmRNZXNzYWdlKHdpbmRvd0EsIHVzZXJCLnNlc3Npb25pZCwgYCR7dGVzdE1lc3NhZ2V9ICsgJHt0aW1lU3RhbXB9YCk7XG4gIHdpbmRvd0EubG9jYXRvcihgJHt0ZXN0TWVzc2FnZX0gPiBzdmdgKS53YWl0Rm9yO1xuICBhd2FpdCB3aW5kb3dBLmlzVmlzaWJsZSgnW2RhdGEtdGVzdGlkPW1zZy1zdGF0dXMtb3V0Z29pbmddJyk7XG4gIGF3YWl0IHdpbmRvd0Eud2FpdEZvclRpbWVvdXQoNTUwMCk7XG4gIC8vIFVzZXIgQiBzZW5kcyBtZXNzYWdlIHRvIFVzZXIgQiB0byBVU0VSIEFcbiAgYXdhaXQgc2VuZE1lc3NhZ2Uod2luZG93QiwgdXNlckEuc2Vzc2lvbmlkLCBgJHt0ZXN0UmVwbHl9ICsgJHt0aW1lU3RhbXB9YCk7XG4gIGF3YWl0IHdpbmRvd0Eud2FpdEZvclRpbWVvdXQoNTUwMCk7XG4gIC8vIE5hdmlnYXRlIHRvIGNvbnRhY3RzIHRhYiBpbiBVc2VyIEIncyB3aW5kb3dcbiAgYXdhaXQgd2luZG93Qi5jbGljaygnW2RhdGEtdGVzdGlkPWNvbnRhY3Qtc2VjdGlvbl0nKTtcbiAgYXdhaXQgd2luZG93QS53YWl0Rm9yVGltZW91dCgyNTAwKTtcbiAgZXhwZWN0KGF3YWl0IHdpbmRvd0IuaW5uZXJUZXh0KCcubW9kdWxlLWNvbnZlcnNhdGlvbl9fdXNlcl9fcHJvZmlsZS1uYW1lJykpLnRvQmUodXNlckEudXNlck5hbWUpO1xuICAvLyBOYXZpZ2F0ZSB0byBjb250YWN0cyB0YWIgaW4gVXNlciBBJ3Mgd2luZG93XG4gIGF3YWl0IHdpbmRvd0EuY2xpY2soJ1tkYXRhLXRlc3RpZD1jb250YWN0LXNlY3Rpb25dJyk7XG4gIGV4cGVjdChhd2FpdCB3aW5kb3dBLmlubmVyVGV4dCgnLm1vZHVsZS1jb252ZXJzYXRpb25fX3VzZXJfX3Byb2ZpbGUtbmFtZScpKS50b0JlKHVzZXJCLnVzZXJOYW1lKTtcbn0pO1xuIl0sCiAgIm1hcHBpbmdzIjogIkFBQUEsa0JBQXdDO0FBQ3hDLHNCQUF3QjtBQUN4QixrQkFBd0I7QUFDeEIsMEJBQTRCO0FBRTVCLE1BQU0sbUJBQW1CO0FBQ3pCLE1BQU0sbUJBQW1CO0FBRXpCLE1BQU0sWUFBWSxLQUFLLElBQUk7QUFFM0IsTUFBTSxjQUFjO0FBQ3BCLE1BQU0sWUFBWTtBQUdsQixzQkFBSywrQkFBK0IsWUFBWTtBQUM5QyxRQUFNLENBQUMsU0FBUyxXQUFXLE1BQU0sUUFBUSxJQUFJLENBQUMseUJBQVEsR0FBRyxHQUFHLHlCQUFRLEdBQUcsQ0FBQyxDQUFDO0FBRXpFLFFBQU0sUUFBUSxNQUFNLDZCQUFRLFNBQVMsZ0JBQWdCO0FBRXJELFFBQU0sUUFBUSxNQUFNLDZCQUFRLFNBQVMsZ0JBQWdCO0FBRXJELFFBQU0scUNBQVksU0FBUyxNQUFNLFdBQVcsR0FBRyxpQkFBaUIsV0FBVztBQUMzRSxVQUFRLFFBQVEsR0FBRyxtQkFBbUIsRUFBRTtBQUN4QyxRQUFNLFFBQVEsVUFBVSxtQ0FBbUM7QUFDM0QsUUFBTSxRQUFRLGVBQWUsSUFBSTtBQUVqQyxRQUFNLHFDQUFZLFNBQVMsTUFBTSxXQUFXLEdBQUcsZUFBZSxXQUFXO0FBQ3pFLFFBQU0sUUFBUSxlQUFlLElBQUk7QUFFakMsUUFBTSxRQUFRLE1BQU0sK0JBQStCO0FBQ25ELFFBQU0sUUFBUSxlQUFlLElBQUk7QUFDakMsMEJBQU8sTUFBTSxRQUFRLFVBQVUsMENBQTBDLENBQUMsRUFBRSxLQUFLLE1BQU0sUUFBUTtBQUUvRixRQUFNLFFBQVEsTUFBTSwrQkFBK0I7QUFDbkQsMEJBQU8sTUFBTSxRQUFRLFVBQVUsMENBQTBDLENBQUMsRUFBRSxLQUFLLE1BQU0sUUFBUTtBQUNqRyxDQUFDOyIsCiAgIm5hbWVzIjogW10KfQo=
