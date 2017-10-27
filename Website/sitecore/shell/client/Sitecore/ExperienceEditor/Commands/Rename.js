define(["sitecore", "/-/speak/v1/ExperienceEditor/ExperienceEditor.js"], function (Sitecore, ExperienceEditor) {
  Sitecore.Commands.Rename =
  {
    canExecute: function (context) {
      if (!ExperienceEditor.isInMode("edit") || context.currentContext.isFallback) {
        return false;
      }

      return context.app.canExecute("ExperienceEditor.Rename.CanRename", context.currentContext);
    },

    execute: function (context) {
      context.app.disableButtonClickEvents();
      ExperienceEditor.PipelinesUtil.initAndExecutePipeline(context.app.RenamePipeline, context);
      context.app.enableButtonClickEvents();
    }
  };
});